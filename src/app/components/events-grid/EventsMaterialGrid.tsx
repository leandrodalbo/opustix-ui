import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { fromUnixTime } from "date-fns";
import { Event } from "../../types/types";
import imgService from "../../services/imgService";

interface EventsMaterialGridProps {
  events: Event[];
}

export const EventsMaterialGrid = ({ events }: EventsMaterialGridProps) => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      spacing={3}
      columns={{ xs: 4, sm: 8, md: 12 }}
      justifyContent="center"
    >
      {events.map((event) => {
        const banner = event.banners.find((a) => a.isSecond);
        return (
          <Grid
            key={event.id}
            sx={{ gridColumn: { xs: "span 4", sm: "span 4", md: "span 4" } }}
          >
            <Card
              sx={{
                width: 260,
                height: 500,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardMedia
                component="img"
                sx={{ height: 260, width: "100%", objectFit: "cover" }}
                image={imgService(banner?.imageUrl || "test-banner", false)}
                alt={event.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {event.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Categoria: {event.category}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Ciudad: {event.venue.city} - {event.venue.country}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {fromUnixTime(event.startTime).toLocaleDateString("es-ES")} -{" "}
                  {fromUnixTime(event.endTime).toLocaleDateString("es-ES")}
                </Typography>
              </CardContent>
              <Box textAlign="center" mb={4}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#388e3c",
                    },
                  }}
                  onClick={() => navigate(`/buy?eventId=${event.id}`)}
                >
                  COMPRAR
                </Button>
              </Box>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
