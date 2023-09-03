import { Shein } from "./shein";

let htmlItems = htmlToElement(`<table class="c-order-detail-table new-order-table" data-v-51932a2c=""><thead data-v-51932a2c=""><tr data-v-51932a2c=""><th data-v-51932a2c="">Productos</th><th data-v-51932a2c="">Cantidad</th><th data-v-51932a2c="">SKU</th><th data-v-51932a2c="">Importe <!----><span class="sui-popover__trigger" showfooter="false" delayrender="0" title="" content=""><i class="iconfont icon-help" data-v-51932a2c=""></i></span></th><th data-v-51932a2c="">Estado</th><!--v-if--><th data-v-51932a2c="">Acción</th></tr></thead><tbody class="" data-v-51932a2c=""><tr class="" data-v-51932a2c=""><td tabindex="0" aria-label="ProductosContrast Sequin Cami Bridesmaid Dress" data-v-51932a2c=""><div class="order-products new-order-products j-order-3276241384222731" exchange="0" data-v-51932a2c=""><div class="img-box" data-v-51932a2c=""><!-- <img :src="transformImg({ img: item.product.goods_img })" /> --><div data-v-51932a2c="" style="width: 45px;"><div class="crop-image-container" data-before-crop-src="//img.ltwebstatic.com/images3_pi/2023/01/29/16749800293a2d20721f07d1f8becb44f3f05bc5bb_thumbnail_220x293.webp" data-v-51932a2c="" style="padding-bottom: calc(133%);"><!-- <div --><!--   class="backdrop-frame" --><!--   :style="backdropFrameStyle" --><!-- ></div> --><img class="lazyload crop-image-container__img" src="//img.ltwebstatic.com/images3_pi/2023/01/29/16749800293a2d20721f07d1f8becb44f3f05bc5bb_thumbnail_220x293.webp" data-src="//img.ltwebstatic.com/images3_pi/2023/01/29/16749800293a2d20721f07d1f8becb44f3f05bc5bb_thumbnail_220x293.webp" data-design-width="0" data-exp="" alt="" loaded="true"></div></div><!--v-if--></div><div class="info" data-v-51932a2c=""><!----><span class="sui-popover__trigger detail-goods-box" showfooter="false" delayrender="0" title="" content="Contrast Sequin Cami Bridesmaid Dress"><p class="goods-info" data-v-51932a2c=""><a tabindex="0" class="ga-order-goods" data-sku="sn2212162103418262" href="https://us.shein.com/Contrast-Sequin-Cami-Bridesmaid-Dress-p-12863470-cat-3091.html" target="_blank" data-v-51932a2c="" da-eid="sdh3ukp1sf">Contrast Sequin Cami Bridesmaid Dress</a></p></span><p tabindex="0" class="size-info" data-v-51932a2c=""><span data-v-51932a2c=""><!-- 新size逻辑 --><span><!-- 有attribute_value_desc展示attribute_value_sl-attribute_value_desc否则展示attribute_value_sl -->Black<!-- 分隔符，例如skuInfoList返回多条属性，将其中的属性分割开来 -->/</span><span><!-- 新字段区分本地尺码，如有本地尺码替换掉87size尺码 -->8/10<!--v-if--></span></span></p><p tabindex="0" class="price-info" data-v-51932a2c="">$26.99 <!--v-if--></p><p tabindex="0" class="ship-tag quick-ship" data-v-51932a2c="">QuickShip</p><!--v-if--></div></div><div class="extra-point-tip" da-event-expose="1-7-5-18" data-skc_code="sn2212162103418262" data-v-51932a2c="" style="display: none;" da-eid="1o2vbfercdc"><i class="iconfont icon-info" data-v-51932a2c=""></i> No cumple con los requisitos para obtener puntos extra</div><!--v-if--></td><td tabindex="0" aria-label="Cantidad1" data-v-51932a2c="">1</td><td tabindex="0" aria-label="SKUsn2212162103418262" data-v-51932a2c="">sn2212162103418262</td><td tabindex="0" aria-label="Importe$26.99" class="" data-v-51932a2c=""><div tabindex="0" data-v-51932a2c=""><!--v-if--><span class="struct-price__dis" data-v-51932a2c="">$24.09</span><br data-v-51932a2c=""><del class="struct-gray-light" data-v-51932a2c="">$26.99</del></div></td><td tabindex="0" aria-label="Estado" data-order-status="18" rowspan="1" data-v-51932a2c=""><span tabindex="0" class="order-status">Todo está enviado</span><!--v-if--></td><td class="detail-item-action" tabindex="0" aria-label="Acción" rowspan="1" data-v-51932a2c=""><!--v-if--></td><!--v-if--><!--v-if--></tr></tbody></table>`);


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
        const crawler = new Shein("GSUNQX53100MERH", selector);
        const orderLink = crawler.OrderLink(htmlItems[0]);
        expect(orderLink).toEqual("https://us.shein.com/user/orders/detail/GSUNQX53100MERH")
    });

    it("image selector", () => {
        class DummySelector implements Selector {
            GetLink(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetImages(e: Element, query: string): string {
                return "//img.ltwebstatic.com/images3_pi/2022/04/21/16505230317df05b728cf594cfb40ff4e472b23351_thumbnail_220x293.webp";
            }
            GetText(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            Fetch(query: string): NodeListOf<Element> {
                return htmlItems;
            }
        }

        const selector = new DummySelector();
        const crawler = new Shein("33cfe84ab82885292d3a678598b37e11", selector);
        const image = crawler.ImageURL(htmlItems[0]);
        expect(image).toEqual(`=IMAGE("${"//img.ltwebstatic.com/images3_pi/2022/04/21/16505230317df05b728cf594cfb40ff4e472b23351_thumbnail_220x293.webp"}")`)
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
                return "SHEIN Felegant Solid PU Leather Skinny Pants";
            }
            Fetch(query: string): NodeListOf<Element> {
                return htmlItems;
            }
        }

        const selector = new DummySelector();
        const crawler = new Shein("33cfe84ab82885292d3a678598b37e11", selector);
        const description = crawler.Description(htmlItems[0]);
        expect(description).toEqual("Felegant Solid PU Leather Skinny Pants")
    });

    it("description selector", () => {
        const selector = new EmptyDummySelector();
        const crawler = new Shein("33cfe84ab82885292d3a678598b37e11", selector);
        const brand = crawler.Brand(htmlItems[0]);
        expect(brand).toEqual("Shein")
    });

    it("size selector complex unmapped", () => {
        class DummySelector implements Selector {
            GetLink(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetImages(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetText(e: Element, query: string): string {
                return "Multicolor/6/10";
            }
            Fetch(query: string): NodeListOf<Element> {
                return htmlItems;
            }
        }

        const selector = new DummySelector();
        const crawler = new Shein("33cfe84ab82885292d3a678598b37e11", selector);
        const size = crawler.Size(htmlItems[0]);
        expect(size).toEqual("6/10")
    });

    it("size selector complex", () => {
        class DummySelector implements Selector {
            GetLink(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetImages(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetText(e: Element, query: string): string {
                return "Multicolor/8/10";
            }
            Fetch(query: string): NodeListOf<Element> {
                return htmlItems;
            }
        }

        const selector = new DummySelector();
        const crawler = new Shein("33cfe84ab82885292d3a678598b37e11", selector);
        const size = crawler.Size(htmlItems[0]);
        expect(size).toEqual("L")
    });

    it("size selector simple", () => {
        class DummySelector implements Selector {
            GetLink(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetImages(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetText(e: Element, query: string): string {
                return "Multicolor/8";
            }
            Fetch(query: string): NodeListOf<Element> {
                return htmlItems;
            }
        }

        const selector = new DummySelector();
        const crawler = new Shein("33cfe84ab82885292d3a678598b37e11", selector);
        const size = crawler.Size(htmlItems[0]);
        expect(size).toEqual("L")
    });

    it("size selector simple unmapped", () => {
        class DummySelector implements Selector {
            GetLink(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetImages(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetText(e: Element, query: string): string {
                return "Multicolor/3";
            }
            Fetch(query: string): NodeListOf<Element> {
                return htmlItems;
            }
        }

        const selector = new DummySelector();
        const crawler = new Shein("33cfe84ab82885292d3a678598b37e11", selector);
        const size = crawler.Size(htmlItems[0]);
        expect(size).toEqual("3")
    });

    it("size selector empty", () => {
        class DummySelector implements Selector {
            GetLink(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetImages(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetText(e: Element, query: string): string {
                return "Multicolor";
            }
            Fetch(query: string): NodeListOf<Element> {
                return htmlItems;
            }
        }

        const selector = new DummySelector();
        const crawler = new Shein("33cfe84ab82885292d3a678598b37e11", selector);
        const size = crawler.Size(htmlItems[0]);
        expect(size).toEqual("")
    });

    it("color selector complex", () => {
        class DummySelector implements Selector {
            GetLink(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetImages(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetText(e: Element, query: string): string {
                return "Multicolor/8/10";
            }
            Fetch(query: string): NodeListOf<Element> {
                return htmlItems;
            }
        }

        const selector = new DummySelector();
        const crawler = new Shein("33cfe84ab82885292d3a678598b37e11", selector);
        const color = crawler.Color(htmlItems[0]);
        expect(color).toEqual("Multicolor")
    });

    it("color selector simple", () => {
        class DummySelector implements Selector {
            GetLink(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetImages(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetText(e: Element, query: string): string {
                return "Multicolor/8";
            }
            Fetch(query: string): NodeListOf<Element> {
                return htmlItems;
            }
        }

        const selector = new DummySelector();
        const crawler = new Shein("33cfe84ab82885292d3a678598b37e11", selector);
        const color = crawler.Color(htmlItems[0]);
        expect(color).toEqual("Multicolor")
    });

    it("color selector alone", () => {
        class DummySelector implements Selector {
            GetLink(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetImages(e: Element, query: string): string {
                throw new Error("Method not implemented.");
            }
            GetText(e: Element, query: string): string {
                return "Multicolor";
            }
            Fetch(query: string): NodeListOf<Element> {
                return htmlItems;
            }
        }

        const selector = new DummySelector();
        const crawler = new Shein("33cfe84ab82885292d3a678598b37e11", selector);
        const color = crawler.Color(htmlItems[0]);
        expect(color).toEqual("Multicolor")
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
                return "$13.00";
            }
            Fetch(query: string): NodeListOf<Element> {
                return htmlItems;
            }
        }

        const selector = new DummySelector();
        const crawler = new Shein("33cfe84ab82885292d3a678598b37e11", selector);
        const price = crawler.Price(htmlItems[0]);
        expect(price).toEqual("13.00")
    });

    it("link selector", () => {
        class DummySelector implements Selector {
            GetLink(e: Element, query: string): string {
                return "https://us.shein.com/SHEIN-Belle-Draped-Neck-Sequins-Cami-Top-p-10348631-cat-1779.html";
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
        const crawler = new Shein("33cfe84ab82885292d3a678598b37e11", selector);
        const link = crawler.Link(htmlItems[0]);
        expect(link).toEqual("https://us.shein.com/SHEIN-Belle-Draped-Neck-Sequins-Cami-Top-p-10348631-cat-1779.html")
    });
})

function htmlToElement(html: string): NodeListOf<Element> {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.querySelectorAll(".c-order-detail-table tr");
}
