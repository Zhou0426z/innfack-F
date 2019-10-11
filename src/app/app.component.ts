import { Component, ContentChild, OnInit } from "@angular/core";
import { CategoryService } from "src/Service/category-service";
import { Categories } from "src/Models/categories";

@Component({
  selector: "layout",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  //items want get category
  constructor(private categoryService: CategoryService) {}
  ngOnInit(): void {
    this.categoryService
      .getHeaderCategories()
      .subscribe(data => (this.headerCategories = data));
  }
  public headerCategories: Categories[];
}
