import { ApiServer } from "./ApiServer";
import { ApiMonitor } from "./ApiMonitor";
import { ApiConfigurationNotificationChannel } from "./ApiConfigurationNotificationChannel";
import { Company } from "./Company";

export type ApiConfiguration = {
  id: number;
  name: string;
  chain: string;
  is_enabled: boolean;
  createdAt: string;
  updatedAt: string;
  company?: Company;
  company_id?: number;
  servers: ApiServer[] | undefined;
  monitors: ApiMonitor[] | undefined;
  notification_channels: ApiConfigurationNotificationChannel[] | undefined;
}