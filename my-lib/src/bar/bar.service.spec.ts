import { BarService } from "./bar.service";

describe("BarService", () => {
  let service: BarService;

  beforeEach(() => {
    service = new BarService();
  });

  it("works", () => {
    expect(1).toEqual(1);
  });
});
