import { Component, OnInit, OnDestroy, ViewChild, HostListener, AfterViewInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-root",
  template: "<router-outlet></router-outlet>",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = "app works!";
}
