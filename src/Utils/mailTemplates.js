export const newPostTpl = (
  lotTitle,
  lotViewLink,
  finalLotPhoto,
  prolongLot,
  newPostLink
) => `
<!doctype html>
<html lang="ru-RU" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <title> Новый пост </title>
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }
  </style>
  <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
  <!--[if lte mso 11]>
        <style type="text/css">
          .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    @import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);
  </style>
  <!--<![endif]-->
  <style type="text/css">
    @media only screen and (min-width:690px) {
      .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }

      .mj-column-per-40 {
        width: 40% !important;
        max-width: 40%;
      }
    }
  </style>
  <style type="text/css">
    @media only screen and (max-width:690px) {
      table.mj-full-width-mobile {
        width: 100% !important;
      }

      td.mj-full-width-mobile {
        width: auto !important;
      }
    }
  </style>
  <style type="text/css">
    .social {
      padding-top: 24px !important;
    }

    .shadow {
      filter: drop-shadow(0 10px 14px #1a1a1a3f);
    }

    .lotPhoto {
      width: 88px !important;
    }

    .back {
      background-image: none;
    }

    @media (min-width:690px) {
      .logo {
        padding: 16px 0px 8px 0px;
      }

      .back {
        background-image: url("https://firebasestorage.googleapis.com/v0/b/obmen-market-666.appspot.com/o/logos%2Fshadow-dark.png?alt=media");
        background-repeat: no-repeat;
        background-position: center 220px;
        background-size: 800px;
      }

      .spacer {
        height: 40px;
      }

      .ghost-button {
        padding-top: 24px;
      }

      .social {
        padding-top: 48px !important;
      }
    }
  </style>
</head>

<body style="word-spacing:normal;background-color:#ffffff;">
  <div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;"><b>"${lotTitle}" уже может получать предложения, не забудьте поделииться ссылкой на объявление в соцсетях.</b> Надеемся, вам предложат много полезного и интересного взамен ☺️ Всегда помните, что вы можете увеличить срок публикации!<br>
  </div>
  <div class="back" style="background-color:#ffffff;">
    <!-- Logo -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:732px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="logo,-outlook shadow-outlook" style="vertical-align:top;width:732px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix logo, shadow" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top;padding:0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td align="center" style="font-size:0px;padding:0px;word-break:break-word;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                  <tbody>
                                    <tr>
                                      <td style="width:280px;">
                                        <a href="https://obmen.market" target="_blank">
                                          <img height="auto" src="http://cdn.mcauto-images-production.sendgrid.net/55d8758937b582f0/8b0fd9e2-76da-4c7a-9f8a-afb0136baf0f/592x240.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="280" />
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
    <!-- Post section -->
    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
      <tbody>
        <tr>
          <td>
            <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
            <div style="margin:0px auto;max-width:732px;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:0 16px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="shadow-outlook" width="732px" ><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:700px;" width="700" ><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;"><v:image style="border:0;mso-position-horizontal:center;position:absolute;top:0;width:700px;z-index:-3;" src="${finalLotPhoto}" xmlns:v="urn:schemas-microsoft-com:vml" /><![endif]-->
                      <div class="shadow" style="margin:0 auto;max-width:700px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                          <tr style="vertical-align:top;">
                            <td background="${finalLotPhoto}" style="background:#0C0318 url(${finalLotPhoto}) no-repeat center center / cover;background-position:center center;background-repeat:no-repeat;border-radius:24px;padding:0 24px;vertical-align:middle;" height="360">
                              <!--[if mso | IE]><table border="0" cellpadding="0" cellspacing="0" style="width:700px;" width="700" ><tr><td style=""><![endif]-->
                              <div class="mj-hero-content" style="margin:0px auto;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                                  <tr>
                                    <td style="">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                                        <tr>
                                          <td align="center" style="font-size:0px;padding:0px;padding-bottom:24px;word-break:break-word;">
                                            <div style="font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';font-size:16px;font-weight:500;letter-spacing:-0.08px;line-height:24px;text-align:center;color:#FFFFFF;">Вы создали новое объявление <span style="font-size: 24px;">🔥</span></div>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="center" style="font-size:0px;padding:0px;word-break:break-word;">
                                            <div style="font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';font-size:42px;font-weight:700;letter-spacing:-0.16px;line-height:40px;text-align:center;color:#FFFFFF;"><a href="${lotViewLink}" style="text-decoration:none; color:#ffffff;" class="shadow">${lotTitle}</a></div>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="center" class="shadow" style="font-size:0px;padding:0px;padding-top:32px;word-break:break-word;">
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                              <tbody>
                                                <tr>
                                                  <td style="width:24px;">
                                                    <a href="${lotViewLink}" target="_blank">
                                                      <img height="auto" src="https://firebasestorage.googleapis.com/v0/b/obmen-market-666.appspot.com/o/logos%2Flink.png?alt=media" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" title="Открыть объявление" width="24" />
                                                    </a>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                              <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </table>
                      </div>
                      <!--[if mso | IE]></td></tr></table></td></tr><![endif]-->
                      <!-- lotInfo -->
                      <!-- Buttons -->
                      <!--[if mso | IE]><tr><td class="" width="732px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:700px;" width="700" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                      <div style="margin:0px auto;max-width:700px;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                          <tbody>
                            <tr>
                              <td style="direction:ltr;font-size:0px;padding:0px;padding-top:64px;text-align:center;">
                                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:280px;" ><![endif]-->
                                <div class="mj-column-per-40 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                    <tbody>
                                      <tr>
                                        <td style="vertical-align:top;padding:0px;">
                                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                                            <tbody>
                                              <tr>
                                                <td align="center" vertical-align="middle" class="shadow" style="font-size:0px;padding:0px;word-break:break-word;">
                                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                                    <tr>
                                                      <td align="center" bgcolor="#7000FF" role="presentation" style="border:none;border-radius:16px;cursor:auto;height:56px;mso-padding-alt:16px 32px;background:#7000FF;" valign="middle">
                                                        <a href="${prolongLot}" style="display:inline-block;background:#7000FF;color:#ffffff;font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';font-size:14px;font-weight:700;line-height:120%;letter-spacing:-0.16px;margin:0;text-decoration:none;text-transform:none;padding:16px 32px;mso-padding-alt:0px;border-radius:16px;" target="_blank"> Хочу больше предложений! </a>
                                                      </td>
                                                    </tr>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:280px;" ><![endif]-->
                                <div class="mj-column-per-40 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                    <tbody>
                                      <tr>
                                        <td style="vertical-align:top;padding:0px;">
                                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                                            <tbody>
                                              <tr>
                                                <td align="center" vertical-align="middle" style="font-size:0px;padding:0px;word-break:break-word;">
                                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                                    <tr>
                                                      <td align="center" bgcolor="transparent" role="presentation" style="border:none;border-radius:3px;cursor:auto;height:56px;mso-padding-alt:0px;background:transparent;" valign="middle">
                                                        <a href="${newPostLink}" style="display:inline-block;background:transparent;color:#160242;font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';font-size:14px;font-weight:700;line-height:120%;letter-spacing:-0.16px;margin:0;text-decoration:none;text-transform:none;padding:0px;mso-padding-alt:0px;border-radius:3px;" target="_blank"> Добавить ещё объявление </a>
                                                      </td>
                                                    </tr>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <!--[if mso | IE]></td></tr></table><![endif]-->
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!--[if mso | IE]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Spacer 40px -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:732px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:732px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top;padding:0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td class="spacer" style="font-size:0px;padding:0px;word-break:break-word;">
                                <div style="height:20px;line-height:20px;">&#8202;</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
    <!-- Marketing text -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:732px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;padding-left:16px;padding-right:16px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="border-left:2px solid #7000FF;vertical-align:top;padding:0px;padding-top:8px;padding-bottom:8px;padding-left:24px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td align="left" style="font-size:0px;padding:0px;word-break:break-word;">
                                <div style="font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';font-size:14px;line-height:24px;text-align:left;color:#5F507C;">Если срок публикации объявления будет подходить к концу, а вы захотите получить больше предложений, вы можете продлить срок публикации на 48 часов. Впрочем, сделать это можно в любой момент, даже сейчас, тем более что стоит это всего 30 рублей</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
    <!-- Spacer 40px -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:732px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:732px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top;padding:0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td class="spacer" style="font-size:0px;padding:0px;word-break:break-word;">
                                <div style="height:20px;line-height:20px;">&#8202;</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
    <!-- Social icons -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:732px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:732px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top;padding:0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td align="center" style="font-size:0px;padding:0px;word-break:break-word;">
                                <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" ><tr><td><![endif]-->
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                  <tr class="shadow">
                                    <td style="padding:0 24px;vertical-align:middle;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:40px;">
                                        <tr>
                                          <td style="font-size:0;height:40px;vertical-align:middle;width:40px;">
                                            <a href="https://instagram.com/obmen.market" target="_blank">
                                              <img height="40" src="http://cdn.mcauto-images-production.sendgrid.net/55d8758937b582f0/f55d0fc7-087e-41a4-9d94-2750bdb5a4e5/64x64.png" style="border-radius:3px;display:block;" width="40" />
                                            </a>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                                <!--[if mso | IE]></td><td><![endif]-->
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                  <tr class="shadow">
                                    <td style="padding:0 24px;vertical-align:middle;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:40px;">
                                        <tr>
                                          <td style="font-size:0;height:40px;vertical-align:middle;width:40px;">
                                            <a href="https://fb.com/obmen.market" target="_blank">
                                              <img height="40" src="http://cdn.mcauto-images-production.sendgrid.net/55d8758937b582f0/7eacb2db-391d-43b6-8434-6edd772b155e/64x64.png" style="border-radius:3px;display:block;" width="40" />
                                            </a>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                                <!--[if mso | IE]></td><td><![endif]-->
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                  <tr class="shadow">
                                    <td style="padding:0 24px;vertical-align:middle;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:40px;">
                                        <tr>
                                          <td style="font-size:0;height:40px;vertical-align:middle;width:40px;">
                                            <a href="https://vk.com/obmen.market" target="_blank">
                                              <img height="40" src="http://cdn.mcauto-images-production.sendgrid.net/55d8758937b582f0/da958188-3d0c-4243-adfc-431f3d72b173/64x64.png" style="border-radius:3px;display:block;" width="40" />
                                            </a>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                                <!--[if mso | IE]></td></tr></table><![endif]-->
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
    <!-- Spacer 40px -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:732px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:732px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top;padding:0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td class="spacer" style="font-size:0px;padding:0px;word-break:break-word;">
                                <div style="height:20px;line-height:20px;">&#8202;</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
    <!-- Footer links -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:732px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:732px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top;padding:0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td align="center" class="sendgrid-links" style="font-size:0px;padding:0px;word-break:break-word;">
                                <div style="font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';font-size:14px;line-height:24px;text-align:center;color:#160242;">
                                  <p style="font-size:13px; line-height:20px; letter-spacing: -0.16px;color:#A59EB5;">
                                    <a href="{{{unsubscribe}}}" target="_blank" class="Unsubscribe--unsubscribeLink" style="font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter';text-decoration:none;color:#A59EB5;"> Отписаться </a> | <a href="{{{unsubscribe_preferences}}}" target="_blank" class="Unsubscribe--unsubscribePreferences" style="font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter';text-decoration:none;color:#A59EB5;"> Настройки уведомлений </a>
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
  </div>
</body>

</html>
`;

export const newOfferTpl = (
  offerTitle,
  offerViewLink,
  finalOfferPhoto,
  offerDescription,
  offerAcceptLink,
  offerDeclineLink,
  lotLink,
  lotTitle,
  finalLotPhoto
) => `
<!doctype html>
<html lang="ru-RU" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <title> Новое предложение! </title>
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }
  </style>
  <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
  <!--[if lte mso 11]>
        <style type="text/css">
          .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    @import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);
  </style>
  <!--<![endif]-->
  <style type="text/css">
    @media only screen and (min-width:680px) {
      .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }

      .mj-column-per-33 {
        width: 33% !important;
        max-width: 33%;
      }

      .mj-column-per-20 {
        width: 20% !important;
        max-width: 20%;
      }
    }
  </style>
  <style type="text/css">
    @media only screen and (max-width:680px) {
      table.mj-full-width-mobile {
        width: 100% !important;
      }

      td.mj-full-width-mobile {
        width: auto !important;
      }
    }
  </style>
  <style type="text/css">
    .social {
      padding-top: 24px !important;
    }

    .shadow {
      filter: drop-shadow(0 10px 14px #1a1a1a3f);
    }

    .lotPhoto {
      width: 88px !important;
    }

    .back {
      background-image: none;
    }

    @media (min-width:690px) {
      .logo {
        padding: 16px 0px 8px 0px;
      }

      .back {
        background-image: url("https://firebasestorage.googleapis.com/v0/b/obmen-market-666.appspot.com/o/logos%2Fshadow-dark.png?alt=media");
        background-repeat: no-repeat;
        background-position: center 220px;
        background-size: 800px;
      }

      .spacer {
        height: 40px;
      }

      .ghost-button {
        padding-top: 24px;
      }

      .social {
        padding-top: 48px !important;
      }
    }
  </style>
</head>

<body style="word-spacing:normal;background-color:#ffffff;">
  <div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">"${lotTitle}" обменять на "${offerTitle}". Если это предложение вам не подходит, дождитесь другого и всегда помните, что вы можете увеличить срок публикации!<br>
  </div>
  <div class="back" style="background-color:#ffffff;">
    <!-- Logo -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:732px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="logo,-outlook shadow-outlook" style="vertical-align:top;width:732px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix logo, shadow" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top;padding:0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td align="center" style="font-size:0px;padding:0px;word-break:break-word;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                  <tbody>
                                    <tr>
                                      <td style="width:280px;">
                                        <a href="https://obmen.market" target="_blank">
                                          <img height="auto" src="http://cdn.mcauto-images-production.sendgrid.net/55d8758937b582f0/8b0fd9e2-76da-4c7a-9f8a-afb0136baf0f/592x240.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="280" />
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
    <!-- Post section -->
    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
      <tbody>
        <tr>
          <td>
            <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
            <div style="margin:0px auto;max-width:732px;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:0 16px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="shadow-outlook" width="732px" ><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:700px;" width="700" ><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;"><v:image style="border:0;mso-position-horizontal:center;position:absolute;top:0;width:700px;z-index:-3;" src="${finalOfferPhoto}" xmlns:v="urn:schemas-microsoft-com:vml" /><![endif]-->
                      <div class="shadow" style="margin:0 auto;max-width:700px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                          <tr style="vertical-align:top;">
                            <td background="${finalOfferPhoto}" style="background:#0C0318 url(${finalOfferPhoto}) no-repeat center center / cover;background-position:center center;background-repeat:no-repeat;border-radius:24px;padding:0 24px;vertical-align:middle;" height="360">
                              <!--[if mso | IE]><table border="0" cellpadding="0" cellspacing="0" style="width:700px;" width="700" ><tr><td style=""><![endif]-->
                              <div class="mj-hero-content" style="margin:0px auto;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                                  <tr>
                                    <td style="">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                                        <tr>
                                          <td align="center" style="font-size:0px;padding:0px;padding-bottom:24px;word-break:break-word;">
                                            <div style="font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';font-size:16px;font-weight:500;letter-spacing:-0.08px;line-height:24px;text-align:center;color:#FFFFFF;">У вас есть новое предложение! <span style="font-size: 24px;">🎉</span></div>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="center" style="font-size:0px;padding:0px;word-break:break-word;">
                                            <div style="font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';font-size:42px;font-weight:700;letter-spacing:-0.16px;line-height:40px;text-align:center;color:#FFFFFF;"><a href="${offerViewLink}" style="text-decoration:none; color:#ffffff;" class="shadow">${offerTitle}</a></div>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="center" class="shadow" style="font-size:0px;padding:0px;padding-top:32px;word-break:break-word;">
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                              <tbody>
                                                <tr>
                                                  <td style="width:24px;">
                                                    <a href="${offerViewLink}" target="_blank">
                                                      <img height="auto" src="https://firebasestorage.googleapis.com/v0/b/obmen-market-666.appspot.com/o/logos%2Flink.png?alt=media" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" title="Открыть объявление" width="24" />
                                                    </a>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                              <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </table>
                      </div>
                      <!--[if mso | IE]></td></tr></table></td></tr><![endif]-->
                      <!-- lotInfo -->
                      <!--[if mso | IE]><tr><td class="" width="732px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:700px;" width="700" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                      <div style="margin:0px auto;max-width:700px;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                          <tbody>
                            <tr>
                              <td style="direction:ltr;font-size:0px;padding:0px;padding-top:32px;text-align:center;">
                                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
                                <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                    <tbody>
                                      <tr>
                                        <td style="vertical-align:top;padding:0px;">
                                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                                            <tbody>
                                              <tr>
                                                <td align="left" style="font-size:0px;padding:0px;word-break:break-word;">
                                                  <!--[if mso | IE]><table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" ><tr><td><![endif]-->
                                                  <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                                    <tr class="shadow">
                                                      <td style="padding:0px 24px 0px 0px;vertical-align:middle;">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FAF9FB;border-radius:24px;width:88px;">
                                                          <tr>
                                                            <td style="font-size:0;height:88px;vertical-align:middle;width:88px;">
                                                              <a href="${lotLink}" target="_blank">
                                                                <img title="${lotTitle}" height="88" src="${finalLotPhoto}" style="border-radius:24px;display:block;" width="88" />
                                                              </a>
                                                            </td>
                                                          </tr>
                                                        </table>
                                                      </td>
                                                      <td style="vertical-align:middle;">
                                                        <a href="${lotLink}" style="color:#333333;font-size:16px;font-weight:500;font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';line-height:22px;text-decoration:none;" target="_blank">
                                                          <span class="subheader" style="display: block; padding-bottom: 0px; line-height: 24px; color: #5F507C; letter-spacing: -0.16px;">В обмен на</span>
                                                          <span class="lottitle" style="display: block; font-size: 24px; color: #160242; font-weight: 800; line-height: 32px; letter-spacing: -0.64px;">${lotTitle}</span>
                                                        </a>
                                                      </td>
                                                    </tr>
                                                  </table>
                                                  <!--[if mso | IE]></td></tr></table><![endif]-->
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <!--[if mso | IE]></td></tr></table><![endif]-->
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!--[if mso | IE]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Offer Description -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:732px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;padding-left:16px;padding-right:16px;padding-top:32px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top;padding:0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td align="left" style="font-size:0px;padding:0px;padding-bottom:4px;word-break:break-word;">
                                <div style="font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';font-size:18px;font-weight:700;line-height:24px;text-align:left;color:#160242;">Описание предложения</div>
                              </td>
                            </tr>
                            <tr>
                              <td align="left" style="font-size:0px;padding:0px;word-break:break-word;">
                                <div style="font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';font-size:14px;line-height:24px;text-align:left;color:#5F507C;">${offerDescription}</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
    <!-- Buttons -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:732px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;padding-top:40px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:241.56px;" ><![endif]-->
              <div class="mj-column-per-33 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top;padding:0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td align="center" vertical-align="middle" class="shadow" style="font-size:0px;padding:0px;word-break:break-word;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                  <tr>
                                    <td align="center" bgcolor="#7000FF" role="presentation" style="border:none;border-radius:16px;cursor:auto;height:56px;mso-padding-alt:16px 32px;background:#7000FF;" valign="middle">
                                      <a href="${offerAcceptLink}" style="display:inline-block;background:#7000FF;color:#ffffff;font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';font-size:14px;font-weight:700;line-height:120%;letter-spacing:-0.16px;margin:0;text-decoration:none;text-transform:none;padding:16px 32px;mso-padding-alt:0px;border-radius:16px;" target="_blank"> Принять предложение </a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:146.4px;" ><![endif]-->
              <div class="mj-column-per-20 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top;padding:0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td align="center" vertical-align="middle" style="font-size:0px;padding:0px;word-break:break-word;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                  <tr>
                                    <td align="center" bgcolor="transparent" role="presentation" style="border:none;border-radius:3px;cursor:auto;height:56px;mso-padding-alt:0px;background:transparent;" valign="middle">
                                      <a href="${offerDeclineLink}" style="display:inline-block;background:transparent;color:rgba(255, 43, 43, 1);font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';font-size:14px;font-weight:700;line-height:120%;letter-spacing:-0.16px;margin:0;text-decoration:none;text-transform:none;padding:0px;mso-padding-alt:0px;border-radius:3px;" target="_blank"> Отклонить </a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
    <!-- Social icons -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:732px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:732px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top;padding:0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td align="center" class="social" style="font-size:0px;padding:0px;padding-top:48px;word-break:break-word;">
                                <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" ><tr><td><![endif]-->
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                  <tr class="shadow">
                                    <td style="padding:0 24px;vertical-align:middle;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:40px;">
                                        <tr>
                                          <td style="font-size:0;height:40px;vertical-align:middle;width:40px;">
                                            <a href="https://instagram.com/obmen.market" target="_blank">
                                              <img height="40" src="http://cdn.mcauto-images-production.sendgrid.net/55d8758937b582f0/f55d0fc7-087e-41a4-9d94-2750bdb5a4e5/64x64.png" style="border-radius:3px;display:block;" width="40" />
                                            </a>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                                <!--[if mso | IE]></td><td><![endif]-->
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                  <tr class="shadow">
                                    <td style="padding:0 24px;vertical-align:middle;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:40px;">
                                        <tr>
                                          <td style="font-size:0;height:40px;vertical-align:middle;width:40px;">
                                            <a href="https://fb.com/obmen.market" target="_blank">
                                              <img height="40" src="http://cdn.mcauto-images-production.sendgrid.net/55d8758937b582f0/7eacb2db-391d-43b6-8434-6edd772b155e/64x64.png" style="border-radius:3px;display:block;" width="40" />
                                            </a>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                                <!--[if mso | IE]></td><td><![endif]-->
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                  <tr class="shadow">
                                    <td style="padding:0 24px;vertical-align:middle;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:40px;">
                                        <tr>
                                          <td style="font-size:0;height:40px;vertical-align:middle;width:40px;">
                                            <a href="https://vk.com/obmen.market" target="_blank">
                                              <img height="40" src="http://cdn.mcauto-images-production.sendgrid.net/55d8758937b582f0/da958188-3d0c-4243-adfc-431f3d72b173/64x64.png" style="border-radius:3px;display:block;" width="40" />
                                            </a>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                                <!--[if mso | IE]></td></tr></table><![endif]-->
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
    <!-- Spacer 40px -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:732px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:732px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top;padding:0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td class="spacer" style="font-size:0px;padding:0px;word-break:break-word;">
                                <div style="height:20px;line-height:20px;">&#8202;</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
    <!-- Footer links -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:732px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:732px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top;padding:0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td align="center" class="sendgrid-links" style="font-size:0px;padding:0px;word-break:break-word;">
                                <div style="font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';font-size:14px;line-height:24px;text-align:center;color:#160242;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5" data-role="module-unsubscribe" data-type="unsubscribe" class="module" role="module">
                                  <p style="font-size:13px; line-height:20px; letter-spacing: -0.16px;color:#A59EB5;">
                                    <a href="{{{unsubscribe}}}" target="_blank" class="Unsubscribe--unsubscribeLink" style="font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter';text-decoration:none;color:#A59EB5;"> Отписаться </a> | <a href="{{{unsubscribe_preferences}}}" target="_blank" class="Unsubscribe--unsubscribePreferences" style="font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter';text-decoration:none;color:#A59EB5;"> Настройки уведомлений </a>
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
  </div>
</body>

</html>
`;

export const offerApprovedTpl = (
  lotTitle,
  finalLotPhoto,
  offerTitle,
  offerViewLink,
  lotLink,
  offerApproveLink,
  offerDeclineLink
) => `
<!doctype html>
<html lang="ru-RU" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <title> Предложение принято! </title>
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }
  </style>
  <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
  <!--[if lte mso 11]>
        <style type="text/css">
          .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    @import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);
  </style>
  <!--<![endif]-->
  <style type="text/css">
    @media only screen and (min-width:690px) {
      .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }

      .mj-column-per-33 {
        width: 33% !important;
        max-width: 33%;
      }

      .mj-column-per-20 {
        width: 20% !important;
        max-width: 20%;
      }
    }
  </style>
  <style type="text/css">
    @media only screen and (max-width:690px) {
      table.mj-full-width-mobile {
        width: 100% !important;
      }

      td.mj-full-width-mobile {
        width: auto !important;
      }
    }
  </style>
  <style type="text/css">
    .social {
      padding-top: 24px !important;
    }

    .shadow {
      filter: drop-shadow(0 10px 14px #1a1a1a3f);
    }

    .lotPhoto {
      width: 88px !important;
    }

    .back {
      background-image: none;
    }

    @media (min-width:690px) {
      .logo {
        padding: 16px 0px 8px 0px;
      }

      .back {
        background-image: url("https://firebasestorage.googleapis.com/v0/b/obmen-market-666.appspot.com/o/logos%2Fshadow-blue.png?alt=media");
        background-repeat: no-repeat;
        background-position: center 210px;
        background-size: 800px;
      }

      .spacer {
        height: 40px;
      }

      .ghost-button {
        padding-top: 24px;
      }

      .social {
        padding-top: 48px !important;
      }
    }
  </style>
</head>

<body style="word-spacing:normal;background-color:#ffffff;">
  <div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">"${lotTitle}" обменять на "${offerTitle}". Подтвердите обмен, если предложение до сих пор в силе и вас всё устраивает.<br>
  </div>
  <div class="back" style="background-color:#ffffff;">
    <!-- Logo -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:732px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="logo,-outlook shadow-outlook" style="vertical-align:top;width:732px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix logo, shadow" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top;padding:0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td align="center" style="font-size:0px;padding:0px;word-break:break-word;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                  <tbody>
                                    <tr>
                                      <td style="width:280px;">
                                        <a href="https://obmen.market" target="_blank">
                                          <img height="auto" src="http://cdn.mcauto-images-production.sendgrid.net/55d8758937b582f0/8b0fd9e2-76da-4c7a-9f8a-afb0136baf0f/592x240.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="280" />
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
    <!-- Post section -->
    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
      <tbody>
        <tr>
          <td>
            <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
            <div style="margin:0px auto;max-width:732px;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:0 16px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="shadow-outlook" width="732px" ><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:700px;" width="700" ><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;"><v:image style="border:0;mso-position-horizontal:center;position:absolute;top:0;width:700px;z-index:-3;" xmlns:v="urn:schemas-microsoft-com:vml" /><![endif]-->
                      <div class="shadow" style="margin:0 auto;max-width:700px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                          <tr style="vertical-align:top;">
                            <td style="background:#7000FF;background-position:center center;background-repeat:no-repeat;border-radius:24px;padding:0 24px;vertical-align:middle;" height="360">
                              <!--[if mso | IE]><table border="0" cellpadding="0" cellspacing="0" style="width:700px;" width="700" ><tr><td style=""><![endif]-->
                              <div class="mj-hero-content" style="margin:0px auto;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                                  <tr>
                                    <td style="">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                                        <tr>
                                          <td align="center" style="font-size:0px;padding:0px;padding-bottom:32px;word-break:break-word;">
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                              <tbody>
                                                <tr>
                                                  <td style="width:100px;">
                                                    <img height="auto" src="https://firebasestorage.googleapis.com/v0/b/obmen-market-666.appspot.com/o/logos%2Fsuccess.png?alt=media" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="100" />
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="center" style="font-size:0px;padding:0px;padding-bottom:8px;word-break:break-word;">
                                            <div style="font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';font-size:16px;font-weight:500;letter-spacing:-0.08px;line-height:24px;text-align:center;color:#FFFFFF;">Предложение принято!</div>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="center" style="font-size:0px;padding:0px;word-break:break-word;">
                                            <div style="font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';font-size:42px;font-weight:700;letter-spacing:-0.16px;line-height:40px;text-align:center;color:#FFFFFF;"><a href="${offerViewLink}" style="text-decoration:none; color:#ffffff;" class="shadow">${offerTitle}</a></div>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="center" class="shadow" style="font-size:0px;padding:0px;padding-top:32px;word-break:break-word;">
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                              <tbody>
                                                <tr>
                                                  <td style="width:24px;">
                                                    <a href="${offerViewLink}" target="_blank">
                                                      <img height="auto" src="https://firebasestorage.googleapis.com/v0/b/obmen-market-666.appspot.com/o/logos%2Flink.png?alt=media" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" title="Открыть объявление" width="24" />
                                                    </a>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                              <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </table>
                      </div>
                      <!--[if mso | IE]></td></tr></table></td></tr><![endif]-->
                      <!-- lotInfo -->
                      <!--[if mso | IE]><tr><td class="" width="732px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:700px;" width="700" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                      <div style="margin:0px auto;max-width:700px;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                          <tbody>
                            <tr>
                              <td style="direction:ltr;font-size:0px;padding:0px;padding-top:32px;text-align:center;">
                                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
                                <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                    <tbody>
                                      <tr>
                                        <td style="vertical-align:top;padding:0px;">
                                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                                            <tbody>
                                              <tr>
                                                <td align="left" style="font-size:0px;padding:0px;word-break:break-word;">
                                                  <!--[if mso | IE]><table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" ><tr><td><![endif]-->
                                                  <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                                    <tr class="shadow">
                                                      <td style="padding:0px 24px 0px 0px;vertical-align:middle;">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FAF9FB;border-radius:24px;width:88px;">
                                                          <tr>
                                                            <td style="font-size:0;height:88px;vertical-align:middle;width:88px;">
                                                              <a href="${lotLink}" target="_blank">
                                                                <img title="${lotTitle}" height="88" src="${finalLotPhoto}" style="border-radius:24px;display:block;" width="88" />
                                                              </a>
                                                            </td>
                                                          </tr>
                                                        </table>
                                                      </td>
                                                      <td style="vertical-align:middle;">
                                                        <a href="${lotLink}" style="color:#333333;font-size:16px;font-weight:500;font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';line-height:22px;text-decoration:none;" target="_blank">
                                                          <span class="subheader" style="display: block; padding-bottom: 0px; line-height: 24px; color: #5F507C; letter-spacing: -0.16px;">В обмен на</span>
                                                          <span class="lottitle" style="display: block; font-size: 24px; color: #160242; font-weight: 800; line-height: 32px; letter-spacing: -0.64px;">${lotTitle}</span>
                                                        </a>
                                                      </td>
                                                    </tr>
                                                  </table>
                                                  <!--[if mso | IE]></td></tr></table><![endif]-->
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <!--[if mso | IE]></td></tr></table><![endif]-->
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!--[if mso | IE]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Buttons -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:732px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;padding-top:40px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:241.56px;" ><![endif]-->
              <div class="mj-column-per-33 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top;padding:0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td align="center" vertical-align="middle" class="shadow" style="font-size:0px;padding:0px;word-break:break-word;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                  <tr>
                                    <td align="center" bgcolor="#7000FF" role="presentation" style="border:none;border-radius:16px;cursor:auto;height:56px;mso-padding-alt:16px 32px;background:#7000FF;" valign="middle">
                                      <a href="${offerApproveLink}" style="display:inline-block;background:#7000FF;color:#ffffff;font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';font-size:14px;font-weight:700;line-height:120%;letter-spacing:-0.16px;margin:0;text-decoration:none;text-transform:none;padding:16px 32px;mso-padding-alt:0px;border-radius:16px;" target="_blank"> Подтвердить обмен </a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:146.4px;" ><![endif]-->
              <div class="mj-column-per-20 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top;padding:0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td align="center" vertical-align="middle" style="font-size:0px;padding:0px;word-break:break-word;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                  <tr>
                                    <td align="center" bgcolor="transparent" role="presentation" style="border:none;border-radius:3px;cursor:auto;height:56px;mso-padding-alt:0px;background:transparent;" valign="middle">
                                      <a href="${offerDeclineLink}" style="display:inline-block;background:transparent;color:rgba(255, 43, 43, 1);font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';font-size:14px;font-weight:700;line-height:120%;letter-spacing:-0.16px;margin:0;text-decoration:none;text-transform:none;padding:0px;mso-padding-alt:0px;border-radius:3px;" target="_blank"> Отказаться </a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
    <!-- Spacer 40px -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:732px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:732px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top;padding:0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td class="spacer" style="font-size:0px;padding:0px;word-break:break-word;">
                                <div style="height:20px;line-height:20px;">&#8202;</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
    <!-- Marketing text -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:732px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;padding-left:16px;padding-right:16px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="border-left:2px solid #7000FF;vertical-align:top;padding:0px;padding-top:8px;padding-bottom:8px;padding-left:24px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td align="left" style="font-size:0px;padding:0px;word-break:break-word;">
                                <div style="font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';font-size:14px;line-height:24px;text-align:left;color:#5F507C;">После подтверждения обмена вам станет доступен чат с автором объявления, где вы сможете договориться о подробных условиях обмена и встрече</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
    <!-- Spacer 40px -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:732px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:732px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top;padding:0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td class="spacer" style="font-size:0px;padding:0px;word-break:break-word;">
                                <div style="height:20px;line-height:20px;">&#8202;</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
    <!-- Warning text -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:732px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;padding-left:16px;padding-right:16px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="background-color:#FFEAEA;border-radius:24px;vertical-align:top;padding:24px 32px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td align="left" style="font-size:0px;padding:0px;word-break:break-word;">
                                <div style="font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';font-size:14px;line-height:24px;text-align:left;color:#CB0006;">Если предметы обмена позволяют, старайтесь договариваться о встрече в безопасных людных местах! При возникновении неприятных ситуаций и выявлении мошенников, обязательно <a href="https://obmen.market/support?action=write&subject=liveAccident" style="color:#CB0006; font-weight: 600;">сообщите в службу поддержки!</a></div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
    <!-- Social icons -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:732px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:732px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top;padding:0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td align="center" class="social" style="font-size:0px;padding:0px;padding-top:48px;word-break:break-word;">
                                <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" ><tr><td><![endif]-->
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                  <tr class="shadow">
                                    <td style="padding:0 24px;vertical-align:middle;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:40px;">
                                        <tr>
                                          <td style="font-size:0;height:40px;vertical-align:middle;width:40px;">
                                            <a href="https://instagram.com/obmen.market" target="_blank">
                                              <img height="40" src="http://cdn.mcauto-images-production.sendgrid.net/55d8758937b582f0/f55d0fc7-087e-41a4-9d94-2750bdb5a4e5/64x64.png" style="border-radius:3px;display:block;" width="40" />
                                            </a>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                                <!--[if mso | IE]></td><td><![endif]-->
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                  <tr class="shadow">
                                    <td style="padding:0 24px;vertical-align:middle;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:40px;">
                                        <tr>
                                          <td style="font-size:0;height:40px;vertical-align:middle;width:40px;">
                                            <a href="https://fb.com/obmen.market" target="_blank">
                                              <img height="40" src="http://cdn.mcauto-images-production.sendgrid.net/55d8758937b582f0/7eacb2db-391d-43b6-8434-6edd772b155e/64x64.png" style="border-radius:3px;display:block;" width="40" />
                                            </a>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                                <!--[if mso | IE]></td><td><![endif]-->
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                  <tr class="shadow">
                                    <td style="padding:0 24px;vertical-align:middle;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:40px;">
                                        <tr>
                                          <td style="font-size:0;height:40px;vertical-align:middle;width:40px;">
                                            <a href="https://vk.com/obmen.market" target="_blank">
                                              <img height="40" src="http://cdn.mcauto-images-production.sendgrid.net/55d8758937b582f0/da958188-3d0c-4243-adfc-431f3d72b173/64x64.png" style="border-radius:3px;display:block;" width="40" />
                                            </a>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                                <!--[if mso | IE]></td></tr></table><![endif]-->
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
    <!-- Spacer 40px -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:732px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:732px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top;padding:0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td class="spacer" style="font-size:0px;padding:0px;word-break:break-word;">
                                <div style="height:20px;line-height:20px;">&#8202;</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
    <!-- Footer links -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:732px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:732px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top;padding:0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td align="center" class="sendgrid-links" style="font-size:0px;padding:0px;word-break:break-word;">
                                <div style="font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';font-size:14px;line-height:24px;text-align:center;color:#160242;">
                                  <p style="font-size:13px; line-height:20px; letter-spacing: -0.16px;color:#A59EB5;">
                                    <a href="{{{unsubscribe}}}" target="_blank" class="Unsubscribe--unsubscribeLink" style="font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter';text-decoration:none;color:#A59EB5;"> Отписаться </a> | <a href="{{{unsubscribe_preferences}}}" target="_blank" class="Unsubscribe--unsubscribePreferences" style="font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter';text-decoration:none;color:#A59EB5;"> Настройки уведомлений </a>
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
  </div>
</body>

</html>
`;

export const offerConfirmedTpl = (
  lotTitle,
  finalLotPhoto,
  offerTitle,
  offerViewLink,
  lotLink,
  openChatLink
) => `
<!doctype html>
<html lang="ru-RU" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <title> Обмен подтверждён! </title>
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }
  </style>
  <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
  <!--[if lte mso 11]>
        <style type="text/css">
          .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    @import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);
  </style>
  <!--<![endif]-->
  <style type="text/css">
    @media only screen and (min-width:690px) {
      .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }
    }
  </style>
  <style type="text/css">
    @media only screen and (max-width:690px) {
      table.mj-full-width-mobile {
        width: 100% !important;
      }

      td.mj-full-width-mobile {
        width: auto !important;
      }
    }
  </style>
  <style type="text/css">
    .social {
      padding-top: 24px !important;
    }

    .shadow {
      filter: drop-shadow(0 10px 14px #1a1a1a3f);
    }

    .lotPhoto {
      width: 88px !important;
    }

    .back {
      background-image: none;
    }

    @media (min-width:690px) {
      .logo {
        padding: 16px 0px 8px 0px;
      }

      .back {
        background-image: url("https://firebasestorage.googleapis.com/v0/b/obmen-market-666.appspot.com/o/logos%2Fshadow-blue.png?alt=media");
        background-repeat: no-repeat;
        background-position: center 210px;
        background-size: 800px;
      }

      .spacer {
        height: 40px;
      }

      .ghost-button {
        padding-top: 24px;
      }

      .social {
        padding-top: 48px !important;
      }
    }
  </style>
</head>

<body style="word-spacing:normal;background-color:#ffffff;">
  <div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">"${lotTitle}" обменять на "${offerTitle}". Можете начать чат и договориться о встрече, надеемся что все получат то что хотят ☺️<br>
  </div>
  <div class="back" style="background-color:#ffffff;">
    <!-- Logo -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:732px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="logo,-outlook shadow-outlook" style="vertical-align:top;width:732px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix logo, shadow" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top;padding:0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td align="center" style="font-size:0px;padding:0px;word-break:break-word;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                  <tbody>
                                    <tr>
                                      <td style="width:280px;">
                                        <a href="https://obmen.market" target="_blank">
                                          <img height="auto" src="http://cdn.mcauto-images-production.sendgrid.net/55d8758937b582f0/8b0fd9e2-76da-4c7a-9f8a-afb0136baf0f/592x240.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="280" />
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
    <!-- Post section -->
    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
      <tbody>
        <tr>
          <td>
            <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
            <div style="margin:0px auto;max-width:732px;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:0 16px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="shadow-outlook" width="732px" ><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:700px;" width="700" ><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;"><v:image style="border:0;mso-position-horizontal:center;position:absolute;top:0;width:700px;z-index:-3;" xmlns:v="urn:schemas-microsoft-com:vml" /><![endif]-->
                      <div class="shadow" style="margin:0 auto;max-width:700px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                          <tr style="vertical-align:top;">
                            <td style="background:#7000FF;background-position:center center;background-repeat:no-repeat;border-radius:24px;padding:0 24px;vertical-align:middle;" height="360">
                              <!--[if mso | IE]><table border="0" cellpadding="0" cellspacing="0" style="width:700px;" width="700" ><tr><td style=""><![endif]-->
                              <div class="mj-hero-content" style="margin:0px auto;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                                  <tr>
                                    <td style="">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                                        <tr>
                                          <td align="center" style="font-size:0px;padding:0px;padding-bottom:32px;word-break:break-word;">
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                              <tbody>
                                                <tr>
                                                  <td style="width:100px;">
                                                    <img height="auto" src="https://firebasestorage.googleapis.com/v0/b/obmen-market-666.appspot.com/o/logos%2Fsuccess.png?alt=media" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="100" />
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="center" style="font-size:0px;padding:0px;padding-bottom:8px;word-break:break-word;">
                                            <div style="font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';font-size:16px;font-weight:500;letter-spacing:-0.08px;line-height:24px;text-align:center;color:#FFFFFF;">Предложение подтверждено!</div>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="center" style="font-size:0px;padding:0px;word-break:break-word;">
                                            <div style="font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';font-size:42px;font-weight:700;letter-spacing:-0.16px;line-height:40px;text-align:center;color:#FFFFFF;"><a href="${offerViewLink}" style="text-decoration:none; color:#ffffff;" class="shadow">${offerTitle}</a></div>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="center" class="shadow" style="font-size:0px;padding:0px;padding-top:32px;word-break:break-word;">
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                              <tbody>
                                                <tr>
                                                  <td style="width:24px;">
                                                    <a href="${offerViewLink}" target="_blank">
                                                      <img height="auto" src="https://firebasestorage.googleapis.com/v0/b/obmen-market-666.appspot.com/o/logos%2Flink.png?alt=media" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" title="Открыть объявление" width="24" />
                                                    </a>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                              <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </table>
                      </div>
                      <!--[if mso | IE]></td></tr></table></td></tr><![endif]-->
                      <!-- lotInfo -->
                      <!--[if mso | IE]><tr><td class="" width="732px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:700px;" width="700" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                      <div style="margin:0px auto;max-width:700px;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                          <tbody>
                            <tr>
                              <td style="direction:ltr;font-size:0px;padding:0px;padding-top:32px;text-align:center;">
                                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
                                <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                    <tbody>
                                      <tr>
                                        <td style="vertical-align:top;padding:0px;">
                                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                                            <tbody>
                                              <tr>
                                                <td align="left" style="font-size:0px;padding:0px;word-break:break-word;">
                                                  <!--[if mso | IE]><table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" ><tr><td><![endif]-->
                                                  <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                                    <tr class="shadow">
                                                      <td style="padding:0px 24px 0px 0px;vertical-align:middle;">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FAF9FB;border-radius:24px;width:88px;">
                                                          <tr>
                                                            <td style="font-size:0;height:88px;vertical-align:middle;width:88px;">
                                                              <a href="${lotLink}" target="_blank">
                                                                <img title="${lotTitle}" height="88" src="${finalLotPhoto}" style="border-radius:24px;display:block;" width="88" />
                                                              </a>
                                                            </td>
                                                          </tr>
                                                        </table>
                                                      </td>
                                                      <td style="vertical-align:middle;">
                                                        <a href="${lotLink}" style="color:#333333;font-size:16px;font-weight:500;font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';line-height:22px;text-decoration:none;" target="_blank">
                                                          <span class="subheader" style="display: block; padding-bottom: 0px; line-height: 24px; color: #5F507C; letter-spacing: -0.16px;">В обмен на</span>
                                                          <span class="lottitle" style="display: block; font-size: 24px; color: #160242; font-weight: 800; line-height: 32px; letter-spacing: -0.64px;">${lotTitle}</span>
                                                        </a>
                                                      </td>
                                                    </tr>
                                                  </table>
                                                  <!--[if mso | IE]></td></tr></table><![endif]-->
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <!--[if mso | IE]></td></tr></table><![endif]-->
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!--[if mso | IE]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Buttons -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:732px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;padding-top:40px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:732px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top;padding:0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td align="center" vertical-align="middle" class="shadow" style="font-size:0px;padding:0px;word-break:break-word;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                  <tr>
                                    <td align="center" bgcolor="#7000FF" role="presentation" style="border:none;border-radius:16px;cursor:auto;height:56px;mso-padding-alt:16px 32px;background:#7000FF;" valign="middle">
                                      <a href="${openChatLink}" style="display:inline-block;background:#7000FF;color:#ffffff;font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';font-size:14px;font-weight:700;line-height:120%;letter-spacing:-0.16px;margin:0;text-decoration:none;text-transform:none;padding:16px 32px;mso-padding-alt:0px;border-radius:16px;" target="_blank"> Договориться о встрече </a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
    <!-- Spacer 40px -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:732px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:732px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top;padding:0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td class="spacer" style="font-size:0px;padding:0px;padding-top:34px;word-break:break-word;">
                                <div style="height:20px;line-height:20px;">&#8202;</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
    <!-- Warning text -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:732px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;padding-left:16px;padding-right:16px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="background-color:#FFEAEA;border-radius:24px;vertical-align:top;padding:24px 32px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td align="left" style="font-size:0px;padding:0px;word-break:break-word;">
                                <div style="font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';font-size:14px;line-height:24px;text-align:left;color:#CB0006;">Если предметы обмена позволяют, старайтесь договариваться о встрече в безопасных людных местах! При возникновении неприятных ситуаций и выявлении мошенников, обязательно <a href="https://obmen.market/support?action=write&subject=liveAccident" style="color:#CB0006; font-weight: 600;">сообщите в службу поддержки!</a></div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
    <!-- Social icons -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:732px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:732px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top;padding:0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td align="center" class="social" style="font-size:0px;padding:0px;padding-top:48px;word-break:break-word;">
                                <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" ><tr><td><![endif]-->
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                  <tr class="shadow">
                                    <td style="padding:0 24px;vertical-align:middle;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:40px;">
                                        <tr>
                                          <td style="font-size:0;height:40px;vertical-align:middle;width:40px;">
                                            <a href="https://instagram.com/obmen.market" target="_blank">
                                              <img height="40" src="http://cdn.mcauto-images-production.sendgrid.net/55d8758937b582f0/f55d0fc7-087e-41a4-9d94-2750bdb5a4e5/64x64.png" style="border-radius:3px;display:block;" width="40" />
                                            </a>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                                <!--[if mso | IE]></td><td><![endif]-->
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                  <tr class="shadow">
                                    <td style="padding:0 24px;vertical-align:middle;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:40px;">
                                        <tr>
                                          <td style="font-size:0;height:40px;vertical-align:middle;width:40px;">
                                            <a href="https://fb.com/obmen.market" target="_blank">
                                              <img height="40" src="http://cdn.mcauto-images-production.sendgrid.net/55d8758937b582f0/7eacb2db-391d-43b6-8434-6edd772b155e/64x64.png" style="border-radius:3px;display:block;" width="40" />
                                            </a>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                                <!--[if mso | IE]></td><td><![endif]-->
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                  <tr class="shadow">
                                    <td style="padding:0 24px;vertical-align:middle;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:40px;">
                                        <tr>
                                          <td style="font-size:0;height:40px;vertical-align:middle;width:40px;">
                                            <a href="https://vk.com/obmen.market" target="_blank">
                                              <img height="40" src="http://cdn.mcauto-images-production.sendgrid.net/55d8758937b582f0/da958188-3d0c-4243-adfc-431f3d72b173/64x64.png" style="border-radius:3px;display:block;" width="40" />
                                            </a>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                                <!--[if mso | IE]></td></tr></table><![endif]-->
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
    <!-- Spacer 40px -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:732px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:732px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top;padding:0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td class="spacer" style="font-size:0px;padding:0px;word-break:break-word;">
                                <div style="height:20px;line-height:20px;">&#8202;</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
    <!-- Footer links -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:732px;" width="732" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:732px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:732px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top;padding:0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                          <tbody>
                            <tr>
                              <td align="center" class="sendgrid-links" style="font-size:0px;padding:0px;word-break:break-word;">
                                <div style="font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';font-size:14px;line-height:24px;text-align:center;color:#160242;">
                                  <p style="font-size:13px; line-height:20px; letter-spacing: -0.16px;color:#A59EB5;">
                                    <a href="{{{unsubscribe}}}" target="_blank" class="Unsubscribe--unsubscribeLink" style="font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter';text-decoration:none;color:#A59EB5;"> Отписаться </a> | <a href="{{{unsubscribe_preferences}}}" target="_blank" class="Unsubscribe--unsubscribePreferences" style="font-family:-apple-system, BlinkMacSystemFont, sans-serif, 'Inter';text-decoration:none;color:#A59EB5;"> Настройки уведомлений </a>
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
  </div>
</body>

</html>
`;
