### Running in background

Run command:

> nohup npm start > output.txt 2> err_output.txt </dev/null &

Check pid of processing running the app using:

> lsof -i :8000 -t

Find logs from the application is output.txt
