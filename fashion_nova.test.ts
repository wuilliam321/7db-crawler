import { FashionNova } from "./fashion_nova";

class EmptyDummySelector implements Selector {
    GetLink(query: string): string[] {
        return ["", ""];
    }
    GetImages(query: string): string[] {
        return ["", ""];
    }
    GetText(query: string): string[] {
        return ["", ""];
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
        expect(rows[0]).toEqual(`	${imageURL}	${type}	${description}	${brand}	${size}	${color}	${price}					${orderId}	${link}\n`)
    });

    it("order link selector", () => {
        class DummySelector implements Selector {
            GetLink(query: string): string[] {
                throw new Error("Method not implemented.");
            }
            GetImages(query: string): string[] {
                throw new Error("Method not implemented.");
            }
            GetText(query: string): string[] {
                throw new Error("Method not implemented.");
            }
        }

        const selector = new DummySelector();
        const crawler = new FashionNova("33cfe84ab82885292d3a678598b37e11", selector);
        const orderLink = crawler.OrderLink();
        expect(orderLink).toEqual("https://www.fashionnova.com/account/orders/33cfe84ab82885292d3a678598b37e11")
    });

    it("image selector", () => {
        class DummySelector implements Selector {
            GetLink(query: string): string[] {
                throw new Error("Method not implemented.");
            }
            GetImages(query: string): string[] {
                return ["https://cdn.shopify.com/s/files/1/0293/9277/products/05-21-21Studio1_CE_TP_11-26-20_31_JP13923_Black_P_1134_KL_252x372.jpg?v=1621879025"];
            }
            GetText(query: string): string[] {
                throw new Error("Method not implemented.");
            }
        }

        const selector = new DummySelector();
        const crawler = new FashionNova("33cfe84ab82885292d3a678598b37e11", selector);
        const image = crawler.ImageURL();
        expect(image).toEqual(`=IMAGE("${"https://cdn.shopify.com/s/files/1/0293/9277/products/05-21-21Studio1_CE_TP_11-26-20_31_JP13923_Black_P_1134_KL_252x372.jpg?v=1621879025"}")`)
    });

    it("description selector", () => {
        class DummySelector implements Selector {
            GetLink(query: string): string[] {
                throw new Error("Method not implemented.");
            }
            GetImages(query: string): string[] {
                throw new Error("Method not implemented.");
            }
            GetText(query: string): string[] {
                return ["In My Shadow Romper - Black"];
            }
        }

        const selector = new DummySelector();
        const crawler = new FashionNova("33cfe84ab82885292d3a678598b37e11", selector);
        const description = crawler.Description();
        expect(description).toEqual("In My Shadow Romper")
    });

    it("description selector", () => {
        const selector = new EmptyDummySelector();
        const crawler = new FashionNova("33cfe84ab82885292d3a678598b37e11", selector);
        const brand = crawler.Brand();
        expect(brand).toEqual("FashionNova")
    });

    it("size selector", () => {
        class DummySelector implements Selector {
            GetLink(query: string): string[] {
                throw new Error("Method not implemented.");
            }
            GetImages(query: string): string[] {
                throw new Error("Method not implemented.");
            }
            GetText(query: string): string[] {
                return ["Size: S"];
            }
        }

        const selector = new DummySelector();
        const crawler = new FashionNova("33cfe84ab82885292d3a678598b37e11", selector);
        const size = crawler.Size();
        expect(size).toEqual("S")
    });

    it("color selector", () => {
        class DummySelector implements Selector {
            GetLink(query: string): string[] {
                throw new Error("Method not implemented.");
            }
            GetImages(query: string): string[] {
                throw new Error("Method not implemented.");
            }
            GetText(query: string): string[] {
                return ["In My Shadow Romper - Black"];
            }
        }

        const selector = new DummySelector();
        const crawler = new FashionNova("33cfe84ab82885292d3a678598b37e11", selector);
        const color = crawler.Color();
        expect(color).toEqual("Black")
    });

    it("price selector", () => {
        class DummySelector implements Selector {
            GetLink(query: string): string[] {
                throw new Error("Method not implemented.");
            }
            GetImages(query: string): string[] {
                throw new Error("Method not implemented.");
            }
            GetText(query: string): string[] {
                return ["$49.99"];
            }
        }

        const selector = new DummySelector();
        const crawler = new FashionNova("33cfe84ab82885292d3a678598b37e11", selector);
        const price = crawler.Price();
        expect(price).toEqual("49.99")
    });

    it("link selector", () => {
        class DummySelector implements Selector {
            GetLink(query: string): string[] {
                return ["https://www.fashionnova.com/products/the-best-vibe-jumpsuit-brown?variant=12205239697532"];
            }
            GetImages(query: string): string[] {
                throw new Error("Method not implemented.");
            }
            GetText(query: string): string[] {
                throw new Error("Method not implemented.");
            }
        }

        const selector = new DummySelector();
        const crawler = new FashionNova("33cfe84ab82885292d3a678598b37e11", selector);
        const link = crawler.Link();
        expect(link).toEqual("https://www.fashionnova.com/products/the-best-vibe-jumpsuit-brown?variant=12205239697532")
    });
})

