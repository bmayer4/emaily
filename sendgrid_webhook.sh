function localtunnel {
  lt -s d4hd984dh4ab --port 5000 
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done