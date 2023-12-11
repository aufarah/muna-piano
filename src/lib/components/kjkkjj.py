# [2:15 PM] VIO AYU OKTAVIA PUTU WARISMAN
from redmail import outlook
from redmail import EmailSender
 
# email = EmailSender(
#     host="smtp.office365.com",
#     port=587,
#     use_starttls=False
# )
 
outlook.username = 'ittm.hedwig@btpn.com'
outlook.password = 'P@ssw0rd'
 
 
try :
    print('try sending email')
    outlook.send(
        subject='email subject',
        sender="ittm.hedwig@btpn.com",
        receivers=['vio.warisman@btpn.com'],
        text="Hi, this is an email."
    )
except Exception as e:
    print(str(e))