var http=require("http");
var server= http.createServer(function(request,response)
{
 if(request.url=="/")
 {
 response.writeHead(200,{"Content-Type":"text/html"});
response.write("<center><h1>Welcome!</h1></center>");
response.write("<html><body><center> <h1>I am VISHNU T</h1></center><center>This is home Page! URL was: "+request.url+"</center></body></html>");
 }
 else if(request.url=="/student")
 {
 response.writeHead(200,{"Content-Type":"text/html"});
response.write("<center><h1>Welcome to Students page!</h1></center>");
 response.end("<html><body><center>This is Student Page page for students! URL was: "+request.url+"</center></body></html>");
 }
 else if(request.url=="/admin")
 {
 response.writeHead(200,{"Content-Type":"text/html"});
response.write("<center><h1>Welcome to Admin page</h1></center>");
 response.end("<html><body><center>This is admin Page only admin! URL was: "+request.url+"<center></body></html>");
 }
 else
 {
 response.end("Invalid Request");
 }
});
server.listen(3000);
console.log("Server running")
