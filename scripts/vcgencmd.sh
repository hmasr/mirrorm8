#!/usr/bin/env bash

usage() {
  echo "$(basename $0) [-d on|off]"
  echo "-d ) Enable/Disable display "
}

while getopts ":hd" opt; do
  case ${opt} in
    d )
      display_power_toggle $OPTARG
      ;;
    h )
      usage();
      exit 0;
      ;;
    \? )
      echo "Invalid Option: -$OPTARG" 1>&2
      usage();
      exit 1
      ;;
  esac
done
shift $((OPTIND -1))

display_power_toggle() {
  case "${$1,,}" in
    on)
      vcgencmd display_power 1
    ;;

    off)
      vcgencmd display_power 0;
    ;;

    *)
      echo "Invalid parameter $1"
    ;;
  esac
  done
}
