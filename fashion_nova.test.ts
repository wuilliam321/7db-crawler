import { FashionNova } from "./fashion_nova";

let htmlItems = htmlToElement(`<div class="account-order__line-item">
    <a href="/products/if-it-plisse-you-pant-set-royal?variant=39267675209852" class="account-order__line-item-link" aria-hidden="true">
      <img src="//www.fashionnova.com/cdn/shop/files/07-31-23Studio1_CB_SS_14-14-34_51_HE888PT66_Royal_P_7146_PXF_252x372.jpg?v=1691605535" class="account-order__line-item-image">
    </a>
    <a href="/products/if-it-plisse-you-pant-set-royal?variant=39267675209852" class="account-order__line-item-link">
      <p class="account-order__line-item-title">If It Plisse You Pant Set - Royal</p>
          <p class="account-order__line-item-option">Size: S</p>
    </a>
    <div class="account-order__line-item-prices">
        <p class="account-order__line-item-price account-order__line-item-price--sale"><span class="money">$0.00</span></p>
        <p class="account-order__line-item-price account-order__line-item-price--original"><span class="money">$34.99</span></p>
      <p class="account-order__line-item-quantity">Qty: 1</p>
    </div>
</div>`);

class EmptyDummySelector implements Selector {
    GetLink(parent: Element, query: string): string {
        return "";
    }
    GetImages(parent: Element, query: string): string {
        return "";
    }
    GetText(parent: Element, query: string): string {
        return "";
    }
    Fetch(query: string): NodeListOf<Element> {
        return htmlItems;
    }
}

describe("crawler", () => {
    it("row builder", () => {
        const selector = new EmptyDummySelector();
        const crawler = new FashionNova("33cfe84ab82885292d3a678598b37e11", selector);
        const imageURL = `=IMAGE("")`;
        const type = "";
        const description = "";
        const brand = "FashionNova";
        const size = "";
        const color = "";
        const price = "";
        const orderId = "https://www.fashionnova.com/account/orders/33cfe84ab82885292d3a678598b37e11";
        const link = "";
        const rows = crawler.BuildRow();
        expect(rows[0]).toEqual(`	${imageURL}	${type}	${description}	${brand}	${size}	${color}	${price}						${orderId}	${link}\n`)
    });

    it("order link selector", () => {
        class DummySelector implements Selector {
            GetLink(parent: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetImages(parent: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetText(parent: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            Fetch(query: string): NodeListOf<Element> {
                return htmlItems;
            }
        }

        const selector = new DummySelector();
        const crawler = new FashionNova("33cfe84ab82885292d3a678598b37e11", selector);
        const orderLink = crawler.OrderLink(htmlItems[0]);
        expect(orderLink).toEqual("https://www.fashionnova.com/account/orders/33cfe84ab82885292d3a678598b37e11")
    });

    it("image selector", () => {
        class DummySelector implements Selector {
            GetLink(parent: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetImages(parent: Element, query: string): string {
                return "//www.fashionnova.com/cdn/shop/files/07-31-23Studio1_CB_SS_14-14-34_51_HE888PT66_Royal_P_7146_PXF_252x372.jpg?v=1691605535";
            }
            GetText(parent: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            Fetch(query: string): NodeListOf<Element> {
                return htmlItems;
            }
        }

        const selector = new DummySelector();
        const crawler = new FashionNova("33cfe84ab82885292d3a678598b37e11", selector);
        const image = crawler.ImageURL(htmlItems[0]);
        expect(image).toEqual(`=IMAGE("${"//www.fashionnova.com/cdn/shop/files/07-31-23Studio1_CB_SS_14-14-34_51_HE888PT66_Royal_P_7146_PXF_252x372.jpg?v=1691605535"}")`)
    });

    it("description selector", () => {
        class DummySelector implements Selector {
            GetLink(parent: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetImages(parent: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetText(parent: Element, query: string): string {
                return "In My Shadow Romper - Black";
            }
            Fetch(duery: string): NodeListOf<Element> {
                return htmlItems;
            }
        }

        const selector = new DummySelector();
        const crawler = new FashionNova("33cfe84ab82885292d3a678598b37e11", selector);
        const description = crawler.Description(htmlItems[0]);
        expect(description).toEqual("In My Shadow Romper")
    });

    it("description selector", () => {
        const selector = new EmptyDummySelector();
        const crawler = new FashionNova("33cfe84ab82885292d3a678598b37e11", selector);
        const brand = crawler.Brand(htmlItems[0]);
        expect(brand).toEqual("FashionNova")
    });

    it("size selector", () => {
        class DummySelector implements Selector {
            GetLink(parent: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetImages(parent: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetText(parent: Element, query: string): string {
                return "Size: S";
            }
            Fetch(query: string): NodeListOf<Element> {
                return htmlItems;
            }
        }

        const selector = new DummySelector();
        const crawler = new FashionNova("33cfe84ab82885292d3a678598b37e11", selector);
        const size = crawler.Size(htmlItems[0]);
        expect(size).toEqual("S")
    });

    it("color selector", () => {
        class DummySelector implements Selector {
            GetLink(parent: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetImages(parent: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetText(parent: Element, query: string): string {
                return "In My Shadow Romper - Black";
            }
            Fetch(query: string): NodeListOf<Element> {
                return htmlItems;
            }
        }

        const selector = new DummySelector();
        const crawler = new FashionNova("33cfe84ab82885292d3a678598b37e11", selector);
        const color = crawler.Color(htmlItems[0]);
        expect(color).toEqual("Black")
    });

    it("price selector", () => {
        class DummySelector implements Selector {
            GetLink(parent: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetImages(parent: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetText(parent: Element, query: string): string {
                return "$49.99";
            }
            Fetch(query: string): NodeListOf<Element> {
                return htmlItems;
            }
        }

        const selector = new DummySelector();
        const crawler = new FashionNova("33cfe84ab82885292d3a678598b37e11", selector);
        const price = crawler.Price(htmlItems[0]);
        expect(price).toEqual("49.99")
    });

    it("link selector", () => {
        class DummySelector implements Selector {
            GetLink(parent: Element, query: string): string {
                return "https://www.fashionnova.com/products/the-best-vibe-jumpsuit-brown?variant=12205239697532";
            }
            GetImages(parent: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetText(parent: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            Fetch(query: string): NodeListOf<Element> {
                return htmlItems;
            }
        }

        const selector = new DummySelector();
        const crawler = new FashionNova("33cfe84ab82885292d3a678598b37e11", selector);
        const link = crawler.Link(htmlItems[0]);
        expect(link).toEqual("https://www.fashionnova.com/products/the-best-vibe-jumpsuit-brown?variant=12205239697532")
    });
})

function htmlToElement(html: string): NodeListOf<Element> {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.querySelectorAll(".account-order__line-item");
}
