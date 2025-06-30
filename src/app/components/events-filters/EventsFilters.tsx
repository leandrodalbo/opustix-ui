import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { es } from "date-fns/locale/es";
import { Dispatch, SetStateAction } from "react";

interface EventFiltersProps {
  eventTitle: string;
  setEvenTitle: Dispatch<SetStateAction<string>>;
  cityFilter: string;
  setCityFilter: Dispatch<SetStateAction<string>>;
  categoryFilter: string;
  setCategoryFilter: Dispatch<SetStateAction<string>>;
  dateFilter: Date | null;
  setDateFilter: Dispatch<SetStateAction<Date | null>>;
  clearFilters: () => void;
}

const EventFilters = ({
  eventTitle,
  setEvenTitle,
  cityFilter,
  setCityFilter,
  categoryFilter,
  setCategoryFilter,
  dateFilter,
  setDateFilter,
  clearFilters,
}: EventFiltersProps) => {
  return (
    <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center mb-6 text-black">
      <input
        type="text"
        placeholder="Event Title"
        value={eventTitle}
        onChange={(e) => setEvenTitle(e.target.value)}
        className="w-64 h-10 text-sm bg-white text-black placeholder-black rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        placeholder="Ciudad"
        value={cityFilter}
        onChange={(e) => setCityFilter(e.target.value)}
        className="w-64 h-10 text-sm bg-white text-black placeholder-black rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        placeholder="Categoría"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="w-64 h-10 text-sm bg-white text-black placeholder-black rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
        <DatePicker
          value={dateFilter}
          onChange={(newDate) => setDateFilter(newDate)}
          slotProps={{
            textField: {
              placeholder: "Fecha",
              InputProps: {
                sx: {
                  height: 40,
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  fontSize: "0.875rem",
                },
              },
              InputLabelProps: {
                shrink: true,
                sx: { display: "none" }, // hides label
              },
            },
          }}
        />
      </LocalizationProvider>

      <button
        onClick={clearFilters}
        className="text-sm hover:bg-gray-700  hover:text-white bg-white text-black px-3 py-1.5 rounded-md transition"
      >
        Limpiar filtros
      </button>
    </div>
  );
};

export default EventFilters;
