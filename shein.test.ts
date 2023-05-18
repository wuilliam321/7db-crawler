import { Shein } from "./shein";

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
        const crawler = new Shein("GSUNQX53100MERH", selector);
        const imageURL = `=IMAGE("")`;
        const type = "";
        const description = "";
        const brand = "Shein";
        const size = "";
        const color = "";
        const price = "";
        const orderId = "https://us.shein.com/user/orders/detail/GSUNQX53100MERH";
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
        const crawler = new Shein("GSUNQX53100MERH", selector);
        const orderLink = crawler.OrderLink();
        expect(orderLink).toEqual("https://us.shein.com/user/orders/detail/GSUNQX53100MERH")
    });

    it("image selector", () => {
        class DummySelector implements Selector {
            GetLink(query: string): string[] {
                throw new Error("Method not implemented.");
            }
            GetImages(query: string): string[] {
                return ["//img.ltwebstatic.com/images3_pi/2022/04/21/16505230317df05b728cf594cfb40ff4e472b23351_thumbnail_220x293.webp"];
            }
            GetText(query: string): string[] {
                throw new Error("Method not implemented.");
            }
        }

        const selector = new DummySelector();
        const crawler = new Shein("33cfe84ab82885292d3a678598b37e11", selector);
        const image = crawler.ImageURL();
        expect(image).toEqual(`=IMAGE("${"//img.ltwebstatic.com/images3_pi/2022/04/21/16505230317df05b728cf594cfb40ff4e472b23351_thumbnail_220x293.webp"}")`)
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
                return ["SHEIN Felegant Solid PU Leather Skinny Pants"];
            }
        }

        const selector = new DummySelector();
        const crawler = new Shein("33cfe84ab82885292d3a678598b37e11", selector);
        const description = crawler.Description();
        expect(description).toEqual("Felegant Solid PU Leather Skinny Pants")
    });

    it("description selector", () => {
        const selector = new EmptyDummySelector();
        const crawler = new Shein("33cfe84ab82885292d3a678598b37e11", selector);
        const brand = crawler.Brand();
        expect(brand).toEqual("Shein")
    });

    it("size selector complex", () => {
        class DummySelector implements Selector {
            GetLink(query: string): string[] {
                throw new Error("Method not implemented.");
            }
            GetImages(query: string): string[] {
                throw new Error("Method not implemented.");
            }
            GetText(query: string): string[] {
                return ["Multicolor/8/10"];
            }
        }

        const selector = new DummySelector();
        const crawler = new Shein("33cfe84ab82885292d3a678598b37e11", selector);
        const size = crawler.Size();
        expect(size).toEqual("8/10")
    });

    it("size selector simple", () => {
        class DummySelector implements Selector {
            GetLink(query: string): string[] {
                throw new Error("Method not implemented.");
            }
            GetImages(query: string): string[] {
                throw new Error("Method not implemented.");
            }
            GetText(query: string): string[] {
                return ["Multicolor/8"];
            }
        }

        const selector = new DummySelector();
        const crawler = new Shein("33cfe84ab82885292d3a678598b37e11", selector);
        const size = crawler.Size();
        expect(size).toEqual("8")
    });

    it("size selector empty", () => {
        class DummySelector implements Selector {
            GetLink(query: string): string[] {
                throw new Error("Method not implemented.");
            }
            GetImages(query: string): string[] {
                throw new Error("Method not implemented.");
            }
            GetText(query: string): string[] {
                return ["Multicolor"];
            }
        }

        const selector = new DummySelector();
        const crawler = new Shein("33cfe84ab82885292d3a678598b37e11", selector);
        const size = crawler.Size();
        expect(size).toEqual("")
    });

    it("color selector complex", () => {
        class DummySelector implements Selector {
            GetLink(query: string): string[] {
                throw new Error("Method not implemented.");
            }
            GetImages(query: string): string[] {
                throw new Error("Method not implemented.");
            }
            GetText(query: string): string[] {
                return ["Multicolor/8/10"];
            }
        }

        const selector = new DummySelector();
        const crawler = new Shein("33cfe84ab82885292d3a678598b37e11", selector);
        const color = crawler.Color();
        expect(color).toEqual("Multicolor")
    });

    it("color selector simple", () => {
        class DummySelector implements Selector {
            GetLink(query: string): string[] {
                throw new Error("Method not implemented.");
            }
            GetImages(query: string): string[] {
                throw new Error("Method not implemented.");
            }
            GetText(query: string): string[] {
                return ["Multicolor/8"];
            }
        }

        const selector = new DummySelector();
        const crawler = new Shein("33cfe84ab82885292d3a678598b37e11", selector);
        const color = crawler.Color();
        expect(color).toEqual("Multicolor")
    });

    it("color selector alone", () => {
        class DummySelector implements Selector {
            GetLink(query: string): string[] {
                throw new Error("Method not implemented.");
            }
            GetImages(query: string): string[] {
                throw new Error("Method not implemented.");
            }
            GetText(query: string): string[] {
                return ["Multicolor"];
            }
        }

        const selector = new DummySelector();
        const crawler = new Shein("33cfe84ab82885292d3a678598b37e11", selector);
        const color = crawler.Color();
        expect(color).toEqual("Multicolor")
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
                return ["$13.00"];
            }
        }

        const selector = new DummySelector();
        const crawler = new Shein("33cfe84ab82885292d3a678598b37e11", selector);
        const price = crawler.Price();
        expect(price).toEqual("13.00")
    });

    it("link selector", () => {
        class DummySelector implements Selector {
            GetLink(query: string): string[] {
                return ["https://us.shein.com/SHEIN-Belle-Draped-Neck-Sequins-Cami-Top-p-10348631-cat-1779.html"];
            }
            GetImages(query: string): string[] {
                throw new Error("Method not implemented.");
            }
            GetText(query: string): string[] {
                throw new Error("Method not implemented.");
            }
        }

        const selector = new DummySelector();
        const crawler = new Shein("33cfe84ab82885292d3a678598b37e11", selector);
        const link = crawler.Link();
        expect(link).toEqual("https://us.shein.com/SHEIN-Belle-Draped-Neck-Sequins-Cami-Top-p-10348631-cat-1779.html")
    });
})


