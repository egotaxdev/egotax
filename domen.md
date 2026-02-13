@	A	217.26.150.21	1/2 Hour
mail	A	217.26.150.21	Auto	
webmail	A	217.26.150.21	Auto	
ipv4	A	217.26.150.21	Auto	
www	CNAME	egotax.md	Auto	
imap	CNAME	mail.egotax.md	Auto	
pop3	CNAME	mail.egotax.md	Auto	
smtp	CNAME	mail.egotax.md	Auto	
ftp	CNAME	egotax.md	Auto	
@	MX	mx0.spamcloud.md ( Priority: 10 )	Auto	
@	MX	mx1.spamcloud.md ( Priority: 20 )	Auto	
send	MX	feedback-smtp.eu-west-1.amazonses.com ( Priority: 10 )	Auto	
_imaps._tcp	SRV	imaps.tcp._imaps._tcp. 0 IN SRV 0 0 993 egotax.md.	Auto	
_pop3s._tcp	SRV	pop3s.tcp._pop3s._tcp. 0 IN SRV 0 0 995 egotax.md.	Auto	
_smtps._tcp	SRV	smtps.tcp._smtps._tcp. 0 IN SRV 0 0 465 egotax.md.	Auto	
_domainkey	TXT	o=-	Auto	
default._domainkey	TXT	v=DKIM1; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC6CHCJqASDL1o9XIYs8L2xJ2NnhxjcXQNkzPkPqbz9hghgrxMlA+Ul+D8aMptGnexXtkM58bKEEaYEidRUUOsSVC5QUdUhXUFmDgOqwYAwj7qZzPZF5lF4CUj6CnVpdl1CIjw7BhtK8PlNk+44sps5wg6gLSNbY+RNHDzSWMSTmQIDAQAB;	Auto	
@	TXT	v=spf1 +a a:sc.host.md redirect=_spf.host.md	Auto	
_dmarc	TXT	v=DMARC1; p=none; sp=none; rf=afrf; pct=100; ri=86400	Auto	
resend._domainkey	TXT	p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD6XSxNalnXucQgnyWpohWq/CmWDAPkRqZS+NToBDR5R9GFV2T8G8j4aJ8DTlPTrJPN/A1KGAb/Un51Fb1meSGVFAztYwAwN4bGHnIdX98IDLv6wdB3VBnndRqoQCb0HkiZZOFhByFZ0suAisYGvlZcDduaFvRiGsW6AB6fazBi5wIDAQAB	Auto	
send	TXT	v=spf1 include:amazonses.com ~all	Auto	
