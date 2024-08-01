echo '\nTest Server'
curl localhost:5000/
echo '\n\n'

echo '\nGet a saint'
curl localhost:5000/saint/1
echo '\n\n'

echo '\nEmpty'
curl localhost:5000/saint/
echo '\n\n'

# echo '\nString'
# curl localhost:5000/saint/hi
# echo '\n\n'

# echo '\nBoolean'
# curl localhost:5000/saint/false
# echo '\n\n'