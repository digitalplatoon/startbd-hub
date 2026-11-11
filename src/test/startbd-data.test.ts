import { describe, expect, it } from "vitest";

import { ecosystemServices, filterServices, roadmapPhases } from "@/lib/startbd-data";

describe("startBD ecosystem plan", () => {
  it("includes the requested 5 core, 9 vertical, and 7 content services", () => {
    expect(ecosystemServices.filter((service) => service.group === "core")).toHaveLength(5);
    expect(ecosystemServices.filter((service) => service.group === "verticals")).toHaveLength(9);
    expect(ecosystemServices.filter((service) => service.group === "content")).toHaveLength(7);
    expect(ecosystemServices).toHaveLength(21);
  });

  it("keeps the four roadmap phases in their specified three-month windows", () => {
    expect(roadmapPhases.map(({ name, months }) => [name, months])).toEqual([
      ["Foundation", "M1–M3"],
      ["Traffic Engine", "M4–M6"],
      ["Vertical Expansion", "M7–M9"],
      ["Developer Ecosystem", "M10–M12"],
    ]);
  });

  it("finds BanglaInterior by its requested interior search term", () => {
    expect(filterServices("interior", "all").map(({ name }) => name)).toContain("BanglaInterior");
  });

  it("finds BanglaEV by the requested EV search term", () => {
    expect(filterServices("EV", "all").map(({ name }) => name)).toContain("BanglaEV");
  });

  it("finds translateBD by the requested translation search term", () => {
    expect(filterServices("translate", "all").map(({ name }) => name)).toContain("translateBD");
  });

  it("finds workersBD by the requested jobs search term", () => {
    expect(filterServices("jobs", "all").map(({ name }) => name)).toContain("workersBD");
  });
});