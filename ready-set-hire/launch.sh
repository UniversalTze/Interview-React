#!/usr/bin/env bash

# shebang to tell script to run bash

set -euo pipefail
# e flag error exit on error
# u error on undefined variable
# -o pipefail -> catches failure when piping output to an input of command. 

DB_SERVICE="db"
POSTGREST_SERVICE="postgrest"
FRONTEND_SERVICE="frontend"

POSTGREST_PORT=3000
FRONTEND_PORT=8080
TIMEOUT=90 # timer for service hasn't started up in time 

wait_for() {
  local name=$1 # PostgreSQL, PostgREST, Frontend
  local cmd=$2 # the commands. e.g curl or docker exec commands
  local waited=0

  echo "Waiting for $name..."
  # > is implicitly 1> (1 is FD Standard out), so its sending standard out to /dev/null (blackhole)
  # dup2(old fd, new fd) (in C) -> uses the file descriptor number specified in newfd.  In other
  # words, the file descriptor newfd is adjusted so that it now refers
  # to the same open file description as oldfd.
  # That is the same as doing 2>&1 where FD-2 (Standard error) now points to Standard output, standard output points to 
  # /dev/null so all output and errors are going to /dev/null

  # until eval is similar to while ! command; do:
  # until "false"
  until eval "$cmd" > /dev/null 2>&1; do
    sleep 2
    waited=$((waited + 2))
    if [ "$waited" -ge "$TIMEOUT" ]; then
      echo "Timed out waiting for $name"
      exit 1 # exit if taking too long
    fi
  done

  echo "$name is ready!"
}

echo "Building images (no cache)..."
docker compose build --no-cache

echo "Starting services..."
docker compose up -d

# PostgreSQL 
# grabs container id for db service. Docker compose ps lists a table but -q option gives back 
# only the id. "DB service" tells it to look at the service in docker compose table which is the same name as 
# service name in docker-compose.yml (db)
DB_CONTAINER=$(docker compose ps -q "$DB_SERVICE")
wait_for "PostgreSQL" \
  "docker exec $DB_CONTAINER pg_isready -U postgrest -d ReadySetHire" 

# PostgREST
# curl fetches URL and prints output. 
# -s Suppresses curl’s loading spinner and prints only the HTTP response (or nothing if server hasn’t started)
# -f fail silently. If the HTTP response code is 400–599, curl exits with a non-zero status code.
# No output is printed for errors.
# -s → don’t show progress or errors while waiting
# -f → make curl exit non-zero if PostgREST isn’t ready
#Combined with until ...; do sleep 2; done → retry until the server responds successfully
wait_for "PostgREST" \
  "curl -sf http://localhost:$POSTGREST_PORT/"

# Frontend
# nc is netcat allowing to make TCP/UDP connections, Send or receive data over sockets 
# and Scan ports (lightweight port check)
# -z stands for zero-I/O mode (or scan mode). No data is sent and checks if port is listening or not. 
# returns a 0 code if somethign is listening, else a non zero code
wait_for "Frontend" \
  "nc -z localhost $FRONTEND_PORT"

echo "Started up with no problem. Frontend link found below:"
echo "http://localhost:8080"