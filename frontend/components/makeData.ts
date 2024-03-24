import { type MRT_ColumnDef } from 'mantine-react-table';
import { ApiMonitor } from '../types/ApiMonitor';
import { MonitorTypeEnum } from '../types/MonitorTypeEnum';
import { getRandomEnumValue } from '../utils/utils';

export type Monitor = {
  id: number;
  name: string;
  chain: string;
  monitors: string[];
  servers: string[];
  isEnabled: boolean;
  status: boolean;
};

export const columns: MRT_ColumnDef<Monitor>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'city',
    header: 'City',
  },
  {
    accessorKey: 'state',
    header: 'State',
  },
];


const monitorsData = (count: number) => {
    const monitors: ApiMonitor[] = [];

    for (let i = 0; i < count; i++) {
        const monitor: ApiMonitor = {
            id: i + 1, // Assuming ids start from 1
            name: `Monitor ${i + 1}`,
            type: getRandomEnumValue(MonitorTypeEnum) as MonitorTypeEnum, // Assuming MonitorTypeEnum is defined
            is_enabled: true,
            configuration: {
              id: i + 100,
              name: `Monitor config ${i + 1}`,
              chain: `Chain monitor ${i + 1}`,
              is_enabled: true,
              createdAt: new Date().toString(),
              updatedAt: new Date().toString(),
              servers: [{
                id?: number,
                name: string,
                address: string,
                is_enabled: boolean,
                configuration: ApiConfiguration,
                services: ApiService[],
                monitors?: ApiMonitor[]|undefined,
                created_at?: string;
                updated_at?: string;
              }]
              monitors: ApiMonitor[]|undefined
              notification_channels: ApiConfigurationNotificationChannel[]|undefined
            }, // Assuming ApiConfiguration is defined
            server: undefined, // Assuming ApiServer is defined
            configuration_object: "",
            status: false,
            last_check: new Date(),
            last_error: ""
        };

        monitors.push(monitor);
    }

    return monitors;
}
}