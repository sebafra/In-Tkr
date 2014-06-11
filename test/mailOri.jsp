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

/*
Context initCtx = new InitialContext();
Context envCtx = (Context) initCtx.lookup("java:comp/env");
Session s = (Session) envCtx.lookup("mail/Session");

Message message = new MimeMessage(s);
message.setFrom(new InternetAddress("jmoreno1976@gmail.com"));
InternetAddress to[] = new InternetAddress[1];
to[0] = new InternetAddress("juan.moreno@diproach.com");
message.setRecipients(Message.RecipientType.TO, to);
message.setSubject("hola");
message.setContent("alertaaaaaaa", "text/plain");
Transport.send(message);
*/

Properties props = System.getProperties();
props.put("mail.smtp.starttls.enable", true); // added this line
props.put("mail.smtp.host", "smtp.gmail.com");
props.put("mail.smtp.user", "jmoreno1976@gmail.com");
props.put("mail.smtp.password", "marvalgmail");
props.put("mail.smtp.port", "587");
props.put("mail.smtp.auth", true);



Session s = Session.getInstance(props,null);

MimeMessage message = new MimeMessage(s);


// Create the email addresses involved
try {
    InternetAddress from = new InternetAddress("Juan Manuel Moreno <jmoreno1976@gmail.com>");
    message.setSubject("Stay Alert");
    message.setFrom(from);
    message.addRecipients(Message.RecipientType.TO, InternetAddress.parse("juan.moreno@diproach.com"));

    // Create a multi-part to combine the parts
    Multipart multipart = new MimeMultipart("alternative");

    // Create your text message part
    BodyPart messageBodyPart = new MimeBodyPart();
    messageBodyPart.setText("some text to send");

    // Add the text part to the multipart
    multipart.addBodyPart(messageBodyPart);

    // Create the html part
    messageBodyPart = new MimeBodyPart();
    String htmlMessage = "Problemaaaa";
    messageBodyPart.setContent(htmlMessage, "text/html");


    // Add html part to multi part
    multipart.addBodyPart(messageBodyPart);

    // Associate multi-part with message
    message.setContent(multipart);

    // Send message
    Transport transport = s.getTransport("smtp");
    transport.connect("smtp.gmail.com", "jmoreno1976@gmail.com", "marvalgmail");
    System.out.println("Transport: "+transport.toString());
    transport.sendMessage(message, message.getAllRecipients());


} catch (AddressException e) {
    // TODO Auto-generated catch block
    e.printStackTrace();
} catch (MessagingException e) {
    // TODO Auto-generated catch block
    e.printStackTrace();
}

%>