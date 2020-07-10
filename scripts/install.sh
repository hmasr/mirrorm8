#!/bin/sh
SERVICE_PATH=/etc/systemd/system/mirrorm8.service
SERVICE_SCRIPT_PATH=/usr/bin/mirrorm8.sh

SCRIPT=$(readlink -f "$0")
SCRIPT_PATH=$(dirname "$SCRIPT")

echo "Creating systemd service $SERVICE_PATH"
/bin/cat << EOF > $SERVICE_PATH
[Unit]
Description=Mirrorm8 (Smart Mirror) Service.
After=network.target

[Service]
Type=simple
ExecStart=/bin/bash $SERVICE_SCRIPT_PATH
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF

chmod 644 $SERVICE_PATH

echo "Creating run script $SERVICE_SCRIPT_PATH"

/bin/cat << EOF > $SERVICE_SCRIPT_PATH
cd "${SCRIPT_PATH}"
cd ..
npm start
EOF

chmod +x $SERVICE_SCRIPT_PATH

echo "Enabling systemd service"
systemctl enable mirrorm8.service

echo "Done..."
