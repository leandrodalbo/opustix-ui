import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EventFilters from "../events-filters/EventsFilters";
import { vi } from "vitest";

vi.mock("@mui/x-date-pickers/DatePicker", async () => {
  const actual = await vi.importActual("@mui/x-date-pickers/DatePicker");
  return {
    ...actual,
    DatePicker: ({ value, onChange, slotProps }: any) => (
      <input
        placeholder={slotProps?.textField?.placeholder ?? "Fecha"}
        value={value ? value.toISOString().slice(0, 10) : ""}
        onChange={(e) => onChange(new Date(e.target.value))}
        data-testid="datepicker"
      />
    ),
  };
});

describe("EventFilters", () => {
  const setup = () => {
    const setEvenTitle = vi.fn();
    const setCityFilter = vi.fn();
    const setCategoryFilter = vi.fn();
    const setDateFilter = vi.fn();
    const clearFilters = vi.fn();

    render(
      <EventFilters
        eventTitle=""
        setEvenTitle={setEvenTitle}
        cityFilter=""
        setCityFilter={setCityFilter}
        categoryFilter=""
        setCategoryFilter={setCategoryFilter}
        dateFilter={null}
        setDateFilter={setDateFilter}
        clearFilters={clearFilters}
      />
    );

    return {
      setEvenTitle,
      setCityFilter,
      setCategoryFilter,
      setDateFilter,
      clearFilters,
    };
  };

  it("renders all filters and the clear button", () => {
    setup();
    expect(
      screen.getByPlaceholderText("Título del evento")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ciudad")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Categoría")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Fecha")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /limpiar filtros/i })
    ).toBeInTheDocument();
  });

  it("calls setEvenTitle on input change", () => {
    const { setEvenTitle } = setup();
    fireEvent.change(screen.getByPlaceholderText("Título del evento"), {
      target: { value: "Feria" },
    });
    expect(setEvenTitle).toHaveBeenCalledWith("Feria");
  });

  it("calls setCityFilter on input change", () => {
    const { setCityFilter } = setup();
    fireEvent.change(screen.getByPlaceholderText("Ciudad"), {
      target: { value: "Barcelona" },
    });
    expect(setCityFilter).toHaveBeenCalledWith("Barcelona");
  });

  it("calls setCategoryFilter on input change", () => {
    const { setCategoryFilter } = setup();
    fireEvent.change(screen.getByPlaceholderText("Categoría"), {
      target: { value: "Arte" },
    });
    expect(setCategoryFilter).toHaveBeenCalledWith("Arte");
  });

  it("calls clearFilters on button click", () => {
    const { clearFilters } = setup();
    fireEvent.click(screen.getByRole("button", { name: /limpiar filtros/i }));
    expect(clearFilters).toHaveBeenCalled();
  });

  it("calls setDateFilter on date input change", () => {
    const { setDateFilter } = setup();
    const dateInput = screen.getByPlaceholderText("Fecha");
    fireEvent.change(dateInput, { target: { value: "2025-07-01" } });
    expect(setDateFilter).toHaveBeenCalled();
    expect(setDateFilter.mock.calls[0][0]).toBeInstanceOf(Date);
  });
});
