<%@page import="javax.mail.MessagingException"%>
<%@page import="javax.mail.internet.AddressException"%>
<%@page import="javax.mail.BodyPart"%>
<%@page import="javax.mail.internet.MimeBodyPart"%>
<%@page import="javax.mail.internet.MimeMultipart"%>
<%@page import="javax.mail.Multipart"%>
<%@page import="java.util.Properties"%>
<%@page import="javax.mail.Transport"%>
<%@page import="javax.mail.internet.InternetAddress"%>
<%@page import="javax.mail.Session"%>
<%@page import="javax.mail.internet.MimeMessage"%>
<%@page import="javax.mail.Message"%>
<%@page import="javax.naming.InitialContext"%>
<%@page import="javax.naming.Context"%>
<%

Context initCtx = new InitialContext();
Context envCtx = (Context) initCtx.lookup("java:comp/env");
Session s = (Session) envCtx.lookup("mail/Session");

Message message = new MimeMessage(s);
message.setFrom(new InternetAddress(s.getProperty("mail.smtp.user")));
InternetAddress to[] = new InternetAddress[1];
to[0] = new InternetAddress("juan.moreno@diproach.com");
message.setRecipients(Message.RecipientType.TO, to);
message.setSubject("Stay Alert");
message.setContent("Ojo al piojo....", "text/plain");
Transport.send(message);


%>