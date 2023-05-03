import { HtmlSelector } from "./html_selector";

export class FashionNova implements Crawler {
    private url: string;
    private index = 0;
    private size = 1;

    constructor(private orderId: string, private selector: Selector) {
        this.url = "https://www.fashionnova.com/account/orders/";
    }
    updateSize() {
        this.index = 0;
        const count = this.selector.GetImages(".account-order__line-item-image").length;
        this.size = count;
    }
    ImageURL(): string {
        const items = this.selector.GetImages(".account-order__line-item-image");
        return `=IMAGE("${items[this.index]}")`;
    }
    Type(): string {
        return "";
    }
    Description(): string {
        const texts = this.selector.GetText(".account-order__line-item-title");
        const s = texts[this.index].split(" - ");
        if (s.length < 2) {
            return "";
        }
        return s[0];
    }
    Brand(): string {
        return "FashionNova";
    }
    Size(): string {
        const items = this.selector.GetText(".account-order__line-item-option");
        return items[this.index].replace("Size: ", "");
    }
    Color(): string {
        const texts = this.selector.GetText(".account-order__line-item-title");
        const s = texts[this.index].split(" - ");
        if (s.length < 2) {
            return "";
        }
        return s[1];
    }
    Price(): string {
        const texts = this.selector.GetText(".account-order__line-item-price");
        return texts[this.index].replace("$", "");
    }
    Link(): string {
        const texts = this.selector.GetLink(".account-order__line-item-link");
        return texts[this.index];
    }
    OrderLink(): string {
        return this.url + this.orderId;
    }
    BuildRow(): string[] {
        this.updateSize();
        const rows = [] as string[];
        while (this.index < this.size) {
            rows.push(`\t`
                + `${this.ImageURL()}\t${this.Type()}\t${this.Description()}\t`
                + `${this.Brand()}\t${this.Size()}\t${this.Color()}\t`
                + `${this.Price()}\t\t\t\t\t`
                + `${this.OrderLink()}\t${this.Link()}\n`
            );
            this.index++;
        }
        return rows;
    }
}

const c = new FashionNova("order-id", new HtmlSelector());
