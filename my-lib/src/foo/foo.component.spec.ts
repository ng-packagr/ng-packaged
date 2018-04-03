import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { FooComponent } from "./foo.component";

describe("FooComponent", () => {
    let comp: FooComponent;
    let fixture: ComponentFixture<FooComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ FooComponent ],
            schemas: [ NO_ERRORS_SCHEMA ]
        });
        fixture = TestBed.createComponent(FooComponent);
        comp = fixture.componentInstance;
    });

    it("can load instance", () => {
        expect(comp).toBeTruthy();
    });

});
