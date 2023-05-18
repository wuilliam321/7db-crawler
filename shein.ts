export class Shein implements Crawler {
    private url: string;
    private index = 0;
    private size = 1;

    constructor(private orderId: string, private selector: Selector) {
        this.url = `https://us.shein.com/user/orders/detail/` + this.orderId;
    }
    updateSize() {
        this.index = 0;
        const count = this.selector.GetImages(".img-box img").length;
        this.size = count;
    }
    ImageURL(): string {
        const items = this.selector.GetImages(".img-box img");
        let item = items[this.index];
        if (!item) {
            item = "";
        }
        return `=IMAGE("${item}")`;
    }
    Type(): string {
        return "";
    }
    Description(): string {
        const items = this.selector.GetText(".goods-info a");
        let item = items[this.index];
        if (!item) {
            item = "";
        }
        return item.replace("SHEIN", "").trim();
    }
    Brand(): string {
        return "Shein";
    }
    Size(): string {
        const items = this.selector.GetText(".size-info");
        let item = items[this.index];
        if (!item) {
            return "";
        }
        let parts = item.split("/");
        if (parts.length == 1) {
            return "";
        }
        if (parts.length > 2) {
            return parts[1] + "/" + parts[2];
        }
        return parts[1];
    }
    Color(): string {
        const items = this.selector.GetText(".size-info");
        let item = items[this.index];
        if (!item) {
            return "";
        }
        let parts = item.split("/");
        return parts[0];
    }
    Price(): string {
        const items = this.selector.GetText(".struct-gray-light");
        const item = items[this.index];
        if (!item) {
            return "";
        }
        return item.replace("$", "").trim();
    }
    Link(): string {
        const texts = this.selector.GetLink(".goods-info a");
        let item = texts[this.index];
        if (!item) {
            item = "";
        }
        return item;
    }
    OrderLink(): string {
        return this.url;
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

// const c = new Shein("order-id", new HtmlSelector());

