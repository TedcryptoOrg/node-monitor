import { Link, Typography } from '@mui/material';
import { ApiServer } from "../../types/ApiServer";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface ServerLinkProps {
  server: ApiServer;
  showAddress?: boolean;
}

const ServerLink: React.FC<ServerLinkProps> = ({ server, showAddress = false }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Link 
        href={`/servers/${server.id}`}
        underline="hover"
        color="primary"
        sx={{ fontWeight: 500 }}
      >
        {server.name}
      </Link>
      {showAddress && (
        <>
          <Typography variant="body2" color="text.secondary">
            •
          </Typography>
          <Link
            href={server.address}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            color="text.secondary"
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              fontSize: '0.875rem'
            }}
          >
            {server.address}
            <OpenInNewIcon sx={{ fontSize: 14 }} />
          </Link>
        </>
      )}
    </div>
  );
};

export default ServerLink;