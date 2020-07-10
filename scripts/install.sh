#!/bin/sh
SERVICE_PATH=/etc/systemd/system/mirrorm8.service
SERVICE_SCRIPT_PATH=/usr/bin/mirrorm8.sh

SCRIPT=$(readlink -f "$0")
SCRIPT_PATH=$(dirname "$SCRIPT")

/bin/cat << EOF > $SERVICE_PATH
[Unit]
Description=Mirrorm8 (Smart Mirror) Service.

[Service]
Type=simple
ExecStart=/bin/bash $SERVICE_SCRIPT_PATH

[Install]
WantedBy=network-online.target
EOF

chmod 644 $SERVICE_PATH

/bin/cat << EOF > $SERVICE_SCRIPT_PATH
MIRRORM8_SCRIPTS=$SCRIPT_PATH
cd .. && $MIRRORM8_ROOT

npm start
EOF

chmod +x $SERVICE_SCRIPT_PATH

systemctl enable mirrorm8.service
