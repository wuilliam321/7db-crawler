import { Forever21 } from "./forever21";

let htmlItems = htmlToElement(`<div class="product-line-item product-line-item--order " data-product-container="card" data-pid="20004715750702" data-cart-line-item="19d45d6b5476351297869de11f">
<div class="product-line-item__main">
<div class="product-line-item__details row">
<div class="col-3">
<a href="/us/20004715750702.html" class="product-card-badge product-line-item__image-wrap link" title="Satin Corset Cami" tabindex="-1">
<div class="product-card-badge__text-bg  body-type--micro bg--accent-primary--transparent font-weight--bold text-align--center set--w-100">
Final Sale
</div>
<img class="product-line-item__image set--w-100" src="https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dw467e11e0/1_front_750/00471575-07.jpg?sw=200&amp;sh=300" alt="Satin Corset Cami" title="Satin Corset Cami" data-line-item-component="image">
</a>
</div>
<div class="col-9">
<div class="product-line-item__header line-item-header font-weight--semibold">
<a href="/us/20004715750702.html" class="product-line-item__name link" title="Satin Corset Cami">
Satin Corset Cami
</a>
</div>
<div class="product-line-item__attributes body-type--deci">
<p class="product-line-item__attribute text-color--grey-5" data-line-item-component="color">
<span class="product-line-item__attribute-key">
Color:

</span>
<span class="product-line-item__attribute-value">CHAMPAGNE</span>
</p>
<p class="product-line-item__attribute text-color--grey-5" data-line-item-component="size">
<span class="product-line-item__attribute-key">
Size:

</span>
<span class="product-line-item__attribute-value">S</span>
</p>
<div class="product-line-item__options">
</div>
<div class="product-line-item__attribute">
<div class="product-line-item__promotions" data-line-item-component="promotions" data-uuid="19d45d6b5476351297869de11f">
</div>
</div>
</div>
</div>
</div>
<div class="product-line-item__qty-pricing row flex-justify-between">
<div class="product-line-item__unit-price col">
<p class="line-item-pricing-info">
<span class="form-control-label body-type--deci font-weight--bold text-transform--capitalize">
Each
</span>
</p><div class="price flex--inline flex-flow-wrap" data-product-component="price" itemprop="offers">
<span class="price__sales sales flex flex-flow-wrap">
<meta itemprop="priceCurrency" content="USD">
<span class="price__original  text-decoration--strike text-color--grey-5 flex">
<span class="value" itemprop="price" content="22.99">
$22.99
</span>
</span>
<meta itemprop="priceCurrency" content="USD">
<span class="value price__default  font-weight--bold text-color--red  price__default--discount" itemprop="price" content="11.00">
$11.00
</span>
<span class="text-color--grey-6 price__percent-off">52% OFF</span>
</span>
</div>
<p></p>
</div>
<div class="product-line-item__quantity col">
<p class="line-item-pricing-info">
<span class="form-control-label body-type--deci">
Quantity
</span><br>
<span class="pricing qty-card-quantity-count">1</span>
</p>
</div>
<div class="product-line-item__total-price flex-align-end col-4">
<p class="line-item-pricing-info">
<span class="form-control-label body-type--deci font-weight--bold text-transform--capitalize">
Total
</span>
</p>
<div class="item-total-19d45d6b5476351297869de11f price" data-line-item-component="price-total">
<div class="pricing line-item-total-price-amount item-total-19d45d6b5476351297869de11f">
$11.00
</div>
</div>
</div>
</div>
</div>
</div>`);

class EmptyDummySelector implements Selector {
    GetLink(e: Element, query: string): string {
        return "";
    }
    GetImages(e: Element, query: string): string {
        return "";
    }
    GetText(e: Element, query: string): string {
        return "";
    }
    Fetch(query: string): NodeListOf<Element> {
        return htmlItems;
    }
}

describe("crawler", () => {
    it("row builder", () => {
        const selector = new EmptyDummySelector();
        const crawler = new Forever21("8131567885", selector);
        const imageURL = `=IMAGE("")`;
        const type = "";
        const description = "";
        const brand = "Forever21";
        const size = "";
        const color = "";
        const price = "";
        const orderId = "https://www.forever21.com/on/demandware.store/Sites-forever21-Site/en_US/Order-Details?orderID=8131567885&orderFilter=";
        const link = "";
        const rows = crawler.BuildRow();
        expect(rows[0]).toEqual(`	${imageURL}	${type}	${description}	${brand}	${size}	${color}	${price}						${orderId}	${link}\n`)
    });

    it("order link selector", () => {
        class DummySelector implements Selector {
            GetLink(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetImages(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetText(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            Fetch(query: string): NodeListOf<Element> {
                return htmlItems;
            }
        }

        const selector = new DummySelector();
        const crawler = new Forever21("8131567885", selector);
        const orderLink = crawler.OrderLink(htmlItems[0]);
        expect(orderLink).toEqual("https://www.forever21.com/on/demandware.store/Sites-forever21-Site/en_US/Order-Details?orderID=8131567885&orderFilter=")
    });

    it("image selector", () => {
        class DummySelector implements Selector {
            GetLink(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetImages(e: Element, query: string): string {
                return "https://cdn.shopify.com/s/files/1/0293/9277/products/05-21-21Studio1_CE_TP_11-26-20_31_JP13923_Black_P_1134_KL_252x372.jpg?v=1621879025";
            }
            GetText(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            Fetch(query: string): NodeListOf<Element> {
                return htmlItems;
            }
        }

        const selector = new DummySelector();
        const crawler = new Forever21("33cfe84ab82885292d3a678598b37e11", selector);
        const image = crawler.ImageURL(htmlItems[0]);
        expect(image).toEqual(`=IMAGE("${"https://cdn.shopify.com/s/files/1/0293/9277/products/05-21-21Studio1_CE_TP_11-26-20_31_JP13923_Black_P_1134_KL_252x372.jpg?v=1621879025"}")`)
    });

    it("description selector", () => {
        class DummySelector implements Selector {
            GetLink(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetImages(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetText(e: Element, query: string): string {
                return "\nRibbed Longline Cardigan Sweater\n";
            }
            Fetch(query: string): NodeListOf<Element> {
                return htmlItems;
            }
        }

        const selector = new DummySelector();
        const crawler = new Forever21("33cfe84ab82885292d3a678598b37e11", selector);
        const description = crawler.Description(htmlItems[0]);
        expect(description).toEqual("Ribbed Longline Cardigan Sweater")
    });

    it("description selector", () => {
        const selector = new EmptyDummySelector();
        const crawler = new Forever21("33cfe84ab82885292d3a678598b37e11", selector);
        const brand = crawler.Brand(htmlItems[0]);
        expect(brand).toEqual("Forever21")
    });

    it("size selector", () => {
        class DummySelector implements Selector {
            GetLink(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetImages(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetText(e: Element, query: string): string {
                return "'\n\nSize:\n\n\nM\n'";
            }
            Fetch(query: string): NodeListOf<Element> {
                return htmlItems;
            }
        }

        const selector = new DummySelector();
        const crawler = new Forever21("33cfe84ab82885292d3a678598b37e11", selector);
        const size = crawler.Size(htmlItems[0]);
        expect(size).toEqual("M")
    });

    it("color selector", () => {
        class DummySelector implements Selector {
            GetLink(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetImages(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetText(e: Element, query: string): string {
                return "\n\nColor:\n\n\nKHAKI\n";
            }
            Fetch(query: string): NodeListOf<Element> {
                return htmlItems;
            }
        }

        const selector = new DummySelector();
        const crawler = new Forever21("33cfe84ab82885292d3a678598b37e11", selector);
        const color = crawler.Color(htmlItems[0]);
        expect(color).toEqual("KHAKI")
    });

    it("price selector", () => {
        class DummySelector implements Selector {
            GetLink(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetImages(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetText(e: Element, query: string): string {
                return "\n$14.00\n\n$20.00\n\n";
            }
            Fetch(query: string): NodeListOf<Element> {
                return htmlItems;
            }
        }

        const selector = new DummySelector();
        const crawler = new Forever21("33cfe84ab82885292d3a678598b37e11", selector);
        const price = crawler.Price(htmlItems[0]);
        expect(price).toEqual("14.00")
    });

    it("price no discount selector", () => {
        class DummySelector implements Selector {
            GetLink(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetImages(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetText(e: Element, query: string): string {
                return "\n$14.00\n\n";
            }
            Fetch(query: string): NodeListOf<Element> {
                return htmlItems;
            }
        }

        const selector = new DummySelector();
        const crawler = new Forever21("33cfe84ab82885292d3a678598b37e11", selector);
        const price = crawler.Price(htmlItems[0])
        expect(price).toEqual("14.00")
    });

    it("link selector", () => {
        class DummySelector implements Selector {
            GetLink(e: Element, query: string): string {
                return "https://www.fashionnova.com/products/the-best-vibe-jumpsuit-brown?variant=12205239697532";
            }
            GetImages(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetText(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            Fetch(query: string): NodeListOf<Element> {
                return htmlItems;
            }
        }

        const selector = new DummySelector();
        const crawler = new Forever21("33cfe84ab82885292d3a678598b37e11", selector);
        const link = crawler.Link(htmlItems[0]);
        expect(link).toEqual("https://www.fashionnova.com/products/the-best-vibe-jumpsuit-brown?variant=12205239697532")
    });
})


function htmlToElement(html: string): NodeListOf<Element> {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.querySelectorAll(".product-line-item--order");
}
