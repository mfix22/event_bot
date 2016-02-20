var express = require('express');
var app = express();
// var pg = require('pg');
var bodyParser = require('body-parser');
var moment = require('moment');
var request = require("request");

app.set('port', (process.env.PORT || 5000));

// app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  var result = ''
  response.send(result);
});

app.post('/event', function(request, response) {
	console.log("-------------------------------------" + request.body.text + "-------------------------------------")

	var text = request.body.text;

	var info = text.trim().split(/\s+/);
	var output = "";
	var date_info = "";
	var insert_link = ""

	for (var i = 0; i < info.length; i++){
		if (moment(info[i]).isValid()){
			console.log("Valid Moment " + info[i]);
			date_info += (info[i] + " ");
		}
	}
	
	if (info.length >= 3){
		output += ("What: *" + info[0] + "*\n");	//what
		output += ("Where: *" + info[1] + "*\n")	//where
		output += ("When: *" + info[2] + "*")		//date
	}
	if (info.length >= 4){
		var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  			'((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  			'(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  			'(\\#[-a-z\\d_]*)?$','i'); // fragment locater
 		if(!pattern.test(info[3])) {
    		output += (" *" + info[3] + "*")
  		}
  		else{
  			insert_link = '<a class="mcnButton " title="SIGN UP HERE" href="http://' + info[3] + '" target="_blank" style="font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;display: block;">SIGN UP HERE</a>\n'
  			output += ("\nRSVP: <http://" + info[3] + "|LINK>");
  		}
					//time
	}
	if (info.length >= 5){
		insert_link = '<a class="mcnButton " title="SIGN UP HERE" href="http://' + info[4] + '" target="_blank" style="font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;display: block;">SIGN UP HERE</a>\n'
		output += ("\nRSVP: <http://" + info[4] + "|LINK>");
	}

	var mom = moment(date_info);

	console.log("\n\n-------------------------------------" + mom.format("LLLL") + "-------------------------------------");
	console.log("\n\n-------------------------------------" + mom.calendar() + "-------------------------------------");

	var rq = require("request");

	var options = { method: 'PUT',
	  					url: 'https://us10.api.mailchimp.com/3.0/campaigns/de87cbb73a/content',
	  					headers: 
	   					{ 'postman-token': 'dadd5305-ba57-7e3d-0847-35a6ee043e16',
	     					'cache-control': 'no-cache',
	     					'content-type': 'application/json',
	     				authorization: 'Basic dXNlcjpkMjRmZDk0Y2VkNzJhMGJmMDlkMGViNDVmMDBhMThkYS11czEw' },
	  					body: { html: '<!doctype html>\n<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">\n\t<head>\n\t\t<!-- NAME: 1 COLUMN -->\n\t\t<!--[if gte mso 15]>\n\t\t<xml>\n\t\t\t<o:OfficeDocumentSettings>\n\t\t\t<o:AllowPNG/>\n\t\t\t<o:PixelsPerInch>96</o:PixelsPerInch>\n\t\t\t</o:OfficeDocumentSettings>\n\t\t</xml>\n\t\t<![endif]-->\n\t\t<meta charset="UTF-8">\n        <meta http-equiv="X-UA-Compatible" content="IE=edge">\n        <meta name="viewport" content="width=device-width, initial-scale=1">\n\t\t<title>*|MC:SUBJECT|*</title>\n        \n    <style type="text/css">\n\t\tp{\n\t\t\tmargin:10px 0;\n\t\t\tpadding:0;\n\t\t}\n\t\ttable{\n\t\t\tborder-collapse:collapse;\n\t\t}\n\t\th1,h2,h3,h4,h5,h6{\n\t\t\tdisplay:block;\n\t\t\tmargin:0;\n\t\t\tpadding:0;\n\t\t}\n\t\timg,a img{\n\t\t\tborder:0;\n\t\t\theight:auto;\n\t\t\toutline:none;\n\t\t\ttext-decoration:none;\n\t\t}\n\t\tbody,#bodyTable,#bodyCell{\n\t\t\theight:100%;\n\t\t\tmargin:0;\n\t\t\tpadding:0;\n\t\t\twidth:100%;\n\t\t}\n\t\t#outlook a{\n\t\t\tpadding:0;\n\t\t}\n\t\timg{\n\t\t\t-ms-interpolation-mode:bicubic;\n\t\t}\n\t\ttable{\n\t\t\tmso-table-lspace:0pt;\n\t\t\tmso-table-rspace:0pt;\n\t\t}\n\t\t.ReadMsgBody{\n\t\t\twidth:100%;\n\t\t}\n\t\t.ExternalClass{\n\t\t\twidth:100%;\n\t\t}\n\t\tp,a,li,td,blockquote{\n\t\t\tmso-line-height-rule:exactly;\n\t\t}\n\t\ta[href^=tel],a[href^=sms]{\n\t\t\tcolor:inherit;\n\t\t\tcursor:default;\n\t\t\ttext-decoration:none;\n\t\t}\n\t\tp,a,li,td,body,table,blockquote{\n\t\t\t-ms-text-size-adjust:100%;\n\t\t\t-webkit-text-size-adjust:100%;\n\t\t}\n\t\t.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{\n\t\t\tline-height:100%;\n\t\t}\n\t\ta[x-apple-data-detectors]{\n\t\t\tcolor:inherit !important;\n\t\t\ttext-decoration:none !important;\n\t\t\tfont-size:inherit !important;\n\t\t\tfont-family:inherit !important;\n\t\t\tfont-weight:inherit !important;\n\t\t\tline-height:inherit !important;\n\t\t}\n\t\t#bodyCell{\n\t\t\tpadding:10px;\n\t\t}\n\t\t.templateContainer{\n\t\t\tmax-width:600px !important;\n\t\t}\n\t\ta.mcnButton{\n\t\t\tdisplay:block;\n\t\t}\n\t\t.mcnImage{\n\t\t\tvertical-align:bottom;\n\t\t}\n\t\t.mcnTextContent{\n\t\t\tword-break:break-word;\n\t\t}\n\t\t.mcnTextContent img{\n\t\t\theight:auto !important;\n\t\t}\n\t\t.mcnDividerBlock{\n\t\t\ttable-layout:fixed !important;\n\t\t}\n\t\tbody,#bodyTable{\n\t\t\tbackground-color:#FAFAFA;\n\t\t}\n\t\t#bodyCell{\n\t\t\tborder-top:0;\n\t\t}\n\t\t.templateContainer{\n\t\t\tborder:0;\n\t\t}\n\t\th1{\n\t\t\tcolor:#202020;\n\t\t\tfont-family:Helvetica;\n\t\t\tfont-size:26px;\n\t\t\tfont-style:normal;\n\t\t\tfont-weight:bold;\n\t\t\tline-height:125%;\n\t\t\tletter-spacing:normal;\n\t\t\ttext-align:left;\n\t\t}\n\t\th2{\n\t\t\tcolor:#202020;\n\t\t\tfont-family:Helvetica;\n\t\t\tfont-size:22px;\n\t\t\tfont-style:normal;\n\t\t\tfont-weight:bold;\n\t\t\tline-height:125%;\n\t\t\tletter-spacing:normal;\n\t\t\ttext-align:left;\n\t\t}\n\t\th3{\n\t\t\tcolor:#202020;\n\t\t\tfont-family:Helvetica;\n\t\t\tfont-size:20px;\n\t\t\tfont-style:normal;\n\t\t\tfont-weight:bold;\n\t\t\tline-height:125%;\n\t\t\tletter-spacing:normal;\n\t\t\ttext-align:left;\n\t\t}\n\t\th4{\n\t\t\tcolor:#202020;\n\t\t\tfont-family:Helvetica;\n\t\t\tfont-size:18px;\n\t\t\tfont-style:normal;\n\t\t\tfont-weight:bold;\n\t\t\tline-height:125%;\n\t\t\tletter-spacing:normal;\n\t\t\ttext-align:left;\n\t\t}\n\t\t#templatePreheader{\n\t\t\tbackground-color:#FAFAFA;\n\t\t\tborder-top:0;\n\t\t\tborder-bottom:0;\n\t\t\tpadding-top:9px;\n\t\t\tpadding-bottom:9px;\n\t\t}\n\t\t#templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{\n\t\t\tcolor:#656565;\n\t\t\tfont-family:Helvetica;\n\t\t\tfont-size:12px;\n\t\t\tline-height:150%;\n\t\t\ttext-align:left;\n\t\t}\n\t\t#templatePreheader .mcnTextContent a,#templatePreheader .mcnTextContent p a{\n\t\t\tcolor:#656565;\n\t\t\tfont-weight:normal;\n\t\t\ttext-decoration:underline;\n\t\t}\n\t\t#templateHeader{\n\t\t\tbackground-color:#FFFFFF;\n\t\t\tborder-top:0;\n\t\t\tborder-bottom:0;\n\t\t\tpadding-top:9px;\n\t\t\tpadding-bottom:0;\n\t\t}\n\t\t#templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{\n\t\t\tcolor:#202020;\n\t\t\tfont-family:Helvetica;\n\t\t\tfont-size:16px;\n\t\t\tline-height:150%;\n\t\t\ttext-align:left;\n\t\t}\n\t\t#templateHeader .mcnTextContent a,#templateHeader .mcnTextContent p a{\n\t\t\tcolor:#2BAADF;\n\t\t\tfont-weight:normal;\n\t\t\ttext-decoration:underline;\n\t\t}\n\t\t#templateBody{\n\t\t\tbackground-color:#FFFFFF;\n\t\t\tborder-top:0;\n\t\t\tborder-bottom:2px solid #EAEAEA;\n\t\t\tpadding-top:0;\n\t\t\tpadding-bottom:9px;\n\t\t}\n\t\t#templateBody .mcnTextContent,#templateBody .mcnTextContent p{\n\t\t\tcolor:#202020;\n\t\t\tfont-family:Helvetica;\n\t\t\tfont-size:16px;\n\t\t\tline-height:150%;\n\t\t\ttext-align:left;\n\t\t}\n\t\t#templateBody .mcnTextContent a,#templateBody .mcnTextContent p a{\n\t\t\tcolor:#2BAADF;\n\t\t\tfont-weight:normal;\n\t\t\ttext-decoration:underline;\n\t\t}\n\t\t#templateFooter{\n\t\t\tbackground-color:#FAFAFA;\n\t\t\tborder-top:0;\n\t\t\tborder-bottom:0;\n\t\t\tpadding-top:9px;\n\t\t\tpadding-bottom:9px;\n\t\t}\n\t\t#templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{\n\t\t\tcolor:#656565;\n\t\t\tfont-family:Helvetica;\n\t\t\tfont-size:12px;\n\t\t\tline-height:150%;\n\t\t\ttext-align:center;\n\t\t}\n\t\t#templateFooter .mcnTextContent a,#templateFooter .mcnTextContent p a{\n\t\t\tcolor:#656565;\n\t\t\tfont-weight:normal;\n\t\t\ttext-decoration:underline;\n\t\t}\n\t@media only screen and (min-width:768px){\n\t\t.templateContainer{\n\t\t\twidth:600px !important;\n\t\t}\n\n}\t@media only screen and (max-width: 480px){\n\t\tbody,table,td,p,a,li,blockquote{\n\t\t\t-webkit-text-size-adjust:none !important;\n\t\t}\n\n}\t@media only screen and (max-width: 480px){\n\t\tbody{\n\t\t\twidth:100% !important;\n\t\t\tmin-width:100% !important;\n\t\t}\n\n}\t@media only screen and (max-width: 480px){\n\t\t#bodyCell{\n\t\t\tpadding-top:10px !important;\n\t\t}\n\n}\t@media only screen and (max-width: 480px){\n\t\t.mcnImage{\n\t\t\twidth:100% !important;\n\t\t}\n\n}\t@media only screen and (max-width: 480px){\n\t\t.mcnCaptionTopContent,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer{\n\t\t\tmax-width:100% !important;\n\t\t\twidth:100% !important;\n\t\t}\n\n}\t@media only screen and (max-width: 480px){\n\t\t.mcnBoxedTextContentContainer{\n\t\t\tmin-width:100% !important;\n\t\t}\n\n}\t@media only screen and (max-width: 480px){\n\t\t.mcnImageGroupContent{\n\t\t\tpadding:9px !important;\n\t\t}\n\n}\t@media only screen and (max-width: 480px){\n\t\t.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{\n\t\t\tpadding-top:9px !important;\n\t\t}\n\n}\t@media only screen and (max-width: 480px){\n\t\t.mcnImageCardTopImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{\n\t\t\tpadding-top:18px !important;\n\t\t}\n\n}\t@media only screen and (max-width: 480px){\n\t\t.mcnImageCardBottomImageContent{\n\t\t\tpadding-bottom:9px !important;\n\t\t}\n\n}\t@media only screen and (max-width: 480px){\n\t\t.mcnImageGroupBlockInner{\n\t\t\tpadding-top:0 !important;\n\t\t\tpadding-bottom:0 !important;\n\t\t}\n\n}\t@media only screen and (max-width: 480px){\n\t\t.mcnImageGroupBlockOuter{\n\t\t\tpadding-top:9px !important;\n\t\t\tpadding-bottom:9px !important;\n\t\t}\n\n}\t@media only screen and (max-width: 480px){\n\t\t.mcnTextContent,.mcnBoxedTextContentColumn{\n\t\t\tpadding-right:18px !important;\n\t\t\tpadding-left:18px !important;\n\t\t}\n\n}\t@media only screen and (max-width: 480px){\n\t\t.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{\n\t\t\tpadding-right:18px !important;\n\t\t\tpadding-bottom:0 !important;\n\t\t\tpadding-left:18px !important;\n\t\t}\n\n}\t@media only screen and (max-width: 480px){\n\t\t.mcpreview-image-uploader{\n\t\t\tdisplay:none !important;\n\t\t\twidth:100% !important;\n\t\t}\n\n}\t@media only screen and (max-width: 480px){\n\t\th1{\n\t\t\tfont-size:22px !important;\n\t\t\tline-height:125% !important;\n\t\t}\n\n}\t@media only screen and (max-width: 480px){\n\t\th2{\n\t\t\tfont-size:20px !important;\n\t\t\tline-height:125% !important;\n\t\t}\n\n}\t@media only screen and (max-width: 480px){\n\t\th3{\n\t\t\tfont-size:18px !important;\n\t\t\tline-height:125% !important;\n\t\t}\n\n}\t@media only screen and (max-width: 480px){\n\t\th4{\n\t\t\tfont-size:16px !important;\n\t\t\tline-height:150% !important;\n\t\t}\n\n}\t@media only screen and (max-width: 480px){\n\t\t.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{\n\t\t\tfont-size:14px !important;\n\t\t\tline-height:150% !important;\n\t\t}\n\n}\t@media only screen and (max-width: 480px){\n\t\t#templatePreheader{\n\t\t\tdisplay:block !important;\n\t\t}\n\n}\t@media only screen and (max-width: 480px){\n\t\t#templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{\n\t\t\tfont-size:14px !important;\n\t\t\tline-height:150% !important;\n\t\t}\n\n}\t@media only screen and (max-width: 480px){\n\t\t#templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{\n\t\t\tfont-size:16px !important;\n\t\t\tline-height:150% !important;\n\t\t}\n\n}\t@media only screen and (max-width: 480px){\n\t\t#templateBody .mcnTextContent,#templateBody .mcnTextContent p{\n\t\t\tfont-size:16px !important;\n\t\t\tline-height:150% !important;\n\t\t}\n\n}\t@media only screen and (max-width: 480px){\n\t\t#templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{\n\t\t\tfont-size:14px !important;\n\t\t\tline-height:150% !important;\n\t\t}\n\n}</style></head>\n    <body style="height: 100%;margin: 0;padding: 0;width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #FAFAFA;">\n        <center>\n            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;height: 100%;margin: 0;padding: 0;width: 100%;background-color: #FAFAFA;">\n                <tr>\n                    <td align="center" valign="top" id="bodyCell" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;height: 100%;margin: 0;padding: 10px;width: 100%;border-top: 0;">\n                        <!-- BEGIN TEMPLATE // -->\n\t\t\t\t\t\t<!--[if gte mso 9]>\n\t\t\t\t\t\t<table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td align="center" valign="top" width="600" style="width:600px;">\n\t\t\t\t\t\t<![endif]-->\n                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;border: 0;max-width: 600px !important;">\n                            <tr>\n                                <td valign="top" id="templatePreheader" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #FAFAFA;border-top: 0;border-bottom: 0;padding-top: 9px;padding-bottom: 9px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n    <tbody class="mcnImageBlockOuter">\n            <tr>\n                <td valign="top" style="padding: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnImageBlockInner">\n                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n                        <tbody><tr>\n                            <td class="mcnImageContent" valign="top" style="padding-right: 9px;padding-left: 9px;padding-top: 0;padding-bottom: 0;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n                                \n                                    <a href="http://transcend.engineering" title="" class="" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n                                        <img align="center" alt="" src="https://gallery.mailchimp.com/fd7340d7a6b228b9e009d6883/images/2720d01e-52d1-45c6-9a7e-8e178c5286da.png" width="564" style="max-width: 600px;padding-bottom: 0;display: inline !important;vertical-align: bottom;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" class="mcnImage">\n                                    </a>\n                                \n                            </td>\n                        </tr>\n                    </tbody></table>\n                </td>\n            </tr>\n    </tbody>\n</table></td>\n                            </tr>\n                            <tr>\n                                <td valign="top" id="templateHeader" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #FFFFFF;border-top: 0;border-bottom: 0;padding-top: 9px;padding-bottom: 0;"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n    <tbody class="mcnTextBlockOuter">\n        <tr>\n            <td valign="top" class="mcnTextBlockInner" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n                \n                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnTextContentContainer">\n                    <tbody><tr>\n                        \n                        <td valign="top" class="mcnTextContent" style="padding: 9px 18px;color: #000000;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;font-family: Helvetica;font-size: 16px;line-height: 150%;text-align: left;">\n                        \n                            <div style="text-align: left;"><span style="color:#f284a8"><span style="font-size:16px"><strong><u>Upcoming Event</u></strong></span></span><br>\n&nbsp;</div>\n<span style="font-size:18px"><strong>What</strong>: ' + info[0] + '<br>\n<strong>When</strong>: '+ mom.calendar() +'<br>\n<strong>Where</strong>: ' +info[1]+'</span><br>\n&nbsp;\n                        </td>\n                    </tr>\n                </tbody></table>\n                \n            </td>\n        </tr>\n    </tbody>\n</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n    <tbody class="mcnButtonBlockOuter">\n        <tr>\n            <td style="padding-top: 0;padding-right: 18px;padding-bottom: 18px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" valign="top" align="center" class="mcnButtonBlockInner">\n                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonContentContainer" style="border-collapse: separate !important;border-radius: 3px;background-color: #2BAADF;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n                    <tbody>\n                        <tr>\n                            <td align="center" valign="middle" class="mcnButtonContent" style="font-family: Arial;font-size: 16px;padding: 15px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n                               ' + insert_link +'                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n            </td>\n        </tr>\n    </tbody>\n</table></td>\n                            </tr>\n                            <tr>\n                                <td valign="top" id="templateBody" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #FFFFFF;border-top: 0;border-bottom: 2px solid #EAEAEA;padding-top: 0;padding-bottom: 9px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n    <tbody class="mcnFollowBlockOuter">\n        <tr>\n            <td align="center" valign="top" style="padding: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnFollowBlockInner">\n                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentContainer" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n    <tbody><tr>\n        <td align="center" style="padding-left: 9px;padding-right: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnFollowContent">\n                <tbody><tr>\n                    <td align="center" valign="top" style="padding-top: 9px;padding-right: 9px;padding-left: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n                        <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n                            <tbody><tr>\n                                <td align="center" valign="top" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n                                    <!--[if mso]>\n                                    <table align="center" border="0" cellspacing="0" cellpadding="0">\n                                    <tr>\n                                    <![endif]-->\n                                    \n                                        <!--[if mso]>\n                                        <td align="center" valign="top">\n                                        <![endif]-->\n                                        \n                                        \n                                            <table align="left" border="0" cellpadding="0" cellspacing="0" style="display: inline;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n                                                <tbody><tr>\n                                                    <td valign="top" style="padding-right: 10px;padding-bottom: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnFollowContentItemContainer">\n                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n                                                            <tbody><tr>\n                                                                <td align="left" valign="middle" style="padding-top: 5px;padding-right: 10px;padding-bottom: 5px;padding-left: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n                                                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n                                                                        <tbody><tr>\n                                                                            \n                                                                                <td align="center" valign="middle" width="24" class="mcnFollowIconContent" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n                                                                                    <a href="http://www.twitter.com/" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/color-twitter-48.png" style="display: block;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" height="24" width="24" class=""></a>\n                                                                                </td>\n                                                                            \n                                                                            \n                                                                        </tr>\n                                                                    </tbody></table>\n                                                                </td>\n                                                            </tr>\n                                                        </tbody></table>\n                                                    </td>\n                                                </tr>\n                                            </tbody></table>\n                                        \n                                        <!--[if mso]>\n                                        </td>\n                                        <![endif]-->\n                                    \n                                        <!--[if mso]>\n                                        <td align="center" valign="top">\n                                        <![endif]-->\n                                        \n                                        \n                                            <table align="left" border="0" cellpadding="0" cellspacing="0" style="display: inline;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n                                                <tbody><tr>\n                                                    <td valign="top" style="padding-right: 10px;padding-bottom: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnFollowContentItemContainer">\n                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n                                                            <tbody><tr>\n                                                                <td align="left" valign="middle" style="padding-top: 5px;padding-right: 10px;padding-bottom: 5px;padding-left: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n                                                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n                                                                        <tbody><tr>\n                                                                            \n                                                                                <td align="center" valign="middle" width="24" class="mcnFollowIconContent" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n                                                                                    <a href="http://www.facebook.com" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/color-facebook-48.png" style="display: block;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" height="24" width="24" class=""></a>\n                                                                                </td>\n                                                                            \n                                                                            \n                                                                        </tr>\n                                                                    </tbody></table>\n                                                                </td>\n                                                            </tr>\n                                                        </tbody></table>\n                                                    </td>\n                                                </tr>\n                                            </tbody></table>\n                                        \n                                        <!--[if mso]>\n                                        </td>\n                                        <![endif]-->\n                                    \n                                        <!--[if mso]>\n                                        <td align="center" valign="top">\n                                        <![endif]-->\n                                        \n                                        \n                                            <table align="left" border="0" cellpadding="0" cellspacing="0" style="display: inline;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n                                                <tbody><tr>\n                                                    <td valign="top" style="padding-right: 0;padding-bottom: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnFollowContentItemContainer">\n                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n                                                            <tbody><tr>\n                                                                <td align="left" valign="middle" style="padding-top: 5px;padding-right: 10px;padding-bottom: 5px;padding-left: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n                                                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n                                                                        <tbody><tr>\n                                                                            \n                                                                                <td align="center" valign="middle" width="24" class="mcnFollowIconContent" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">\n                                                                                    <a href="http://mailchimp.com" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/color-link-48.png" style="display: block;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" height="24" width="24" class=""></a>\n                                                                                </td>\n                                                                            \n                                                                            \n                                                                        </tr>\n                                                                    </tbody></table>\n                                                                </td>\n                                                            </tr>\n                                                        </tbody></table>\n                                                    </td>\n                                                </tr>\n                                            </tbody></table>\n                                        \n                                        <!--[if mso]>\n                                        </td>\n                                        <![endif]-->\n                                    \n                                    <!--[if mso]>\n                                    </tr>\n                                    </table>\n                                    <![endif]-->\n                                </td>\n                            </tr>\n                        </tbody></table>\n                    </td>\n                </tr>\n            </tbody></table>\n        </td>\n    </tr>\n</tbody></table>\n\n            </td>\n        </tr>\n    </tbody>\n</table></td>\n                            </tr>\n                            <tr>\n                                <td valign="top" id="templateFooter" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #FAFAFA;border-top: 0;border-bottom: 0;padding-top: 9px;padding-bottom: 9px;"></td>\n                            </tr>\n                        </table>\n\t\t\t\t\t\t<!--[if gte mso 9]>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t\t<![endif]-->\n                        <!-- // END TEMPLATE -->\n                    </td>\n                </tr>\n            </table>\n        </center>\n                <center>\n                <br />\n                <br />\n                <br />\n                <br />\n                <br />\n                <br />\n                <table border="0" cellpadding="0" cellspacing="0" width="100%" id="canspamBarWrapper" style="background-color:#FFFFFF; border-top:1px solid #E5E5E5;">\n                    <tr>\n                        <td align="center" valign="top" style="padding-top:20px; padding-bottom:20px;">\n                            <table border="0" cellpadding="0" cellspacing="0" id="canspamBar">\n                                <tr>\n                                    <td align="center" valign="top" style="color:#606060; font-family:Helvetica, Arial, sans-serif; font-size:11px; line-height:150%; padding-right:20px; padding-bottom:5px; padding-left:20px; text-align:center;">\n                                        This email was sent to <a href="mailto:*|EMAIL|*" target="_blank" style="color:#404040 !important;">*|EMAIL|*</a>\n                                        <br />\n                                        <a href="*|ABOUT_LIST|*" target="_blank" style="color:#404040 !important;"><em>why did I get this?</em></a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="*|UNSUB|*" style="color:#404040 !important;">unsubscribe from this list</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="*|UPDATE_PROFILE|*" style="color:#404040 !important;">update subscription preferences</a>\n                                        <br />\n                                        *|LIST:ADDRESSLINE|*\n                                        <br />\n                                        <br />\n                                        *|REWARDS|*\n                                    </td>\n                                </tr>\n                            </table>\n                        </td>\n                    </tr>\n                </table>\n                <style type="text/css">\n                    @media only screen and (max-width: 480px){\n                        table[id="canspamBar"] td{font-size:14px !important;}\n                        table[id="canspamBar"] td a{display:block !important; margin-top:10px !important;}\n                    }\n                </style>\n            </center></body>\n</html>' },
	  							json: true };

		rq(options, function (error, response, body) {
	  	if (error) throw new Error(error);
	  	console.log(body);
	});



    response.send(output);
});


app.post('/api/users', function(req, res) {
    var user_id = req.body.id;

    res.send(user_id);
});

// app.get('/db', function (request, response) {
//   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//     client.query('SELECT * FROM test_table', function(err, result) {
//       done();
//       if (err)
//        { console.error(err); response.send("Error " + err); }
//       else
//        { response.render('pages/db', {results: result.rows} ); }
//     });
//   });
// })

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


