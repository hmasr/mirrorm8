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

sed -i 's/xinit $FP_CHROMIUM $CHROMIUM_OPTS//' /var/lib/dietpi/dietpi-autostart/chromium-autostart.sh

cat << EOF >> /var/lib/dietpi/dietpi-autostart/chromium-autostart.sh
# Fix to disable chromium "Restore Bubble" popup
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' ~/.config/chromium/Default/Preferences
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' ~/.config/chromium/Default/Preferences

xinit \$FP_CHROMIUM \$CHROMIUM_OPTS

EOF

echo "Done..."
