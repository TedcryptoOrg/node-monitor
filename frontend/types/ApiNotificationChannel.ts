export type ApiNotificationChannelInput = {
  type: string;
  name: string;
  configuration_object: string;
  is_enabled: boolean;
};

export type ApiNotificationChannel = {
  id: number;
  //type: NotificationChannelTypeEnum,
  name: string;
  configuration_object: string;
  is_enabled: boolean;
  created_at?: Date;
  updated_at?: Date;
};
