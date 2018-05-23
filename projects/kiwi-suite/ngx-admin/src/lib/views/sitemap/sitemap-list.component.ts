import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'app-sitemap-list',
    templateUrl: './sitemap-list.component.html',
})
export class SitemapListComponent implements OnInit {
    items = [];

    dropZone: string;

    constructor() {
    }

    ngOnInit() {
        this.items = [
            {
                "id": "1",
                "label": "Item 1",
                "pageType": "page",
                "children": []
            },
            {
                "id": "2",
                "label": "Item 2",
                "pageType": "page",
                "children": [
                    {
                        "id": "4",
                        "label": "Item 2a",
                        "pageType": "page",
                        "children": [
                            {
                                "id": "10",
                                "label": "Item x1",
                                "pageType": "page",
                                "children": []
                            },
                            {
                                "id": "11",
                                "label": "Item x2",
                                "pageType": "page",
                                "children": []
                            },
                            {
                                "id": "12",
                                "label": "Item x3",
                                "pageType": "page",
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": "5",
                        "label": "Item 2b",
                        "pageType": "page",
                        "children": []
                    },
                    {
                        "id": "6",
                        "label": "Item 2c",
                        "pageType": "page",
                        "children": []
                    }
                ]
            },
            {
                "id": "3",
                "label": "Item 3",
                "pageType": "page",
                "children": [
                    {
                        "id": "7",
                        "label": "Item 3a",
                        "pageType": "page",
                        "children": []
                    },
                    {
                        "id": "8",
                        "label": "Item 3b",
                        "pageType": "page",
                        "children": []
                    },
                    {
                        "id": "9",
                        "label": "Item 3c",
                        "pageType": "page",
                        "children": []
                    }
                ]
            }
        ];
    }

    drop(event: any)
    {
        this.dropZone = null;
        console.log(this.getInfo(event.value.id, this.items, null));
    }

    drag(event: any)
    {
        this.dropZone = event.value.pageType;
    }

    protected getInfo(searchId: string, items: Array, parent: string): {parent: string, prevSibling: string}
    {
        let prevSibling: string = null;
        for (let item of items) {
            if (item.id === searchId) {
                return {
                    parent: parent,
                    prevSibling: prevSibling
                }
            }
            prevSibling = item.id;
        }

        let result: {parent: string, prevSibling: string} = null;
        for (let item of items) {
            result = this.getInfo(searchId, item.children, item.id);
            if (result !== null) {
                return result;
            }
        }

        return null;
    }
}
