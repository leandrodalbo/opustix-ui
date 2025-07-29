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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      <input
        type="text"
        placeholder="Título del evento"
        value={eventTitle}
        onChange={(e) => setEvenTitle(e.target.value)}
        className="bg-white text-black p-3 rounded w-full"
      />

      <input
        type="text"
        placeholder="Ciudad"
        value={cityFilter}
        onChange={(e) => setCityFilter(e.target.value)}
        className="bg-white text-black p-3 rounded w-full"
      />

      <input
        type="text"
        placeholder="Categoría"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="bg-white text-black p-3 rounded w-full"
      />

      <div className="bg-white rounded w-full">
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <DatePicker
            value={dateFilter}
            onChange={(newDate) => setDateFilter(newDate)}
            slotProps={{
              textField: {
                fullWidth: true,
                variant: "outlined",
                InputProps: {
                  sx: {
                    height: 48,
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    fontSize: "0.875rem",
                  },
                },
                InputLabelProps: {
                  shrink: true,
                  sx: { display: "none" },
                },
              },
            }}
          />
        </LocalizationProvider>
      </div>

      <button
        onClick={clearFilters}
        className="bg-white text-black p-3 rounded w-full hover:bg-gray-100 transition"
      >
        Limpiar filtros
      </button>
    </div>
  );
};

export default EventFilters;
