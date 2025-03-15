curl -H "Content-Type: application/json" -X POST "https://exp.host/--/api/v2/push/send" -d '{
  "to": "ExponentPushToken[eXr4BILBO6_po3YpyG2TT5]",
  "sound": "default",
  "title":"hello curl",
  "body": "world curl",
   "data": {
     "chatId": "123"
   }
}'