import {
  createResolver,
  defineNuxtModule,
  extendPages
} from "nuxt/kit";
import { ROUTES } from "./routes";

export default defineNuxtModule({
  setup() {
    const resolver = createResolver(import.meta.url);
    extendPages((pages) => {
      pages.push(
        {
          name: ROUTES.Booking,
          path: "/station/:stationId/booking/:bookingId",
          file: resolver.resolve("./pages/BookingPage.vue"),
        },
        {
          name: ROUTES.Calendar,
          path: "/",
          file: resolver.resolve("./pages/IndexPage.vue"),
        },
        {
          path: "/:pathMatch(.*)*",
          redirect: "/",
        }
      );
    });

  },
});
