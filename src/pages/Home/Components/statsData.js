import {
  ShoppingBag,
  Clock3,
  DollarSign,
  ShoppingCart,
  Package,
  Users,
} from "lucide-react";
import { CurrencyFormat } from "../../../utils/CurrencyFormat";

export const getDashboardStats = (data) => [
  {
    title: "Total Orders",
    value: data?.dashboard?.orders?.total,
    description: "All orders received",
    icon: ShoppingBag,
    gradient: "from-indigo-500 via-violet-500 to-purple-600",
  },
  {
    title: "Pending Orders",
    value: data?.dashboard?.orders?.pending,
    description: "Awaiting action",
    icon: Clock3,
    gradient: "from-amber-400 via-orange-500 to-red-500",
  },
  {
    title: "Revenue",
    value: CurrencyFormat(data?.dashboard?.revenue?.total),
    description: "Total gross revenue",
    icon: DollarSign,
    gradient: "from-emerald-400 via-green-500 to-lime-500",
  },
  {
    title: "This Month",
    value: CurrencyFormat(data?.dashboard?.revenue?.thisMonth || 0),
    description: "Monthly sales target",
    icon: ShoppingCart,
    gradient: "from-cyan-400 via-sky-500 to-blue-600",
  },
  {
    title: "Top Product",
    value: data?.dashboard?.topProducts[0]?.name,
    description: "Best selling product",
    icon: Package,
    gradient: "from-fuchsia-500 via-pink-500 to-rose-500",
  },
  {
    title: "Users",
    value: data?.dashboard?.totalCustomers,
    description: "Registered customers",
    icon: Users,
    gradient: "from-slate-600 via-slate-700 to-black",
  },
];
