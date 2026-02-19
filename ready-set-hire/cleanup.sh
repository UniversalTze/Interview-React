#!/usr/bin/env bash

# shebang to tell script to run bash

set -eu

echo "Stopping and removing containers."
docker compose down -v

echo "Containers removed"
echo "Deleting all local build artefacts and images"
docker compose down --rmi local

echo "Clean up Complete"
echo " To save further space from docker cache, consider docker builder prune or docker system prune"


