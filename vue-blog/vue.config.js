// const webpack = require('webpack')
const path = require('path')
// 加
const registData = {
  id: 2,
  username: 'zhangsan',
  password: 123,
  email: 'zhangsan@hotmail.com',
}

const searchData = [
  {
    id: 1,
    title: 'Cross Site Scripting (XSS)',
    content: `Overvie
    Cross-Site Scripting (XSS) attacks are a type of injection, in which malicious scripts are injected into otherwise benign and trusted websites. XSS attacks occur when an attacker uses a web application to send malicious code, generally in the form of a browser side script, to a different end user. Flaws that allow these attacks to succeed are quite widespread and occur anywhere a web application uses input from a user within the output it generates without validating or encoding it.
    
    An attacker can use XSS to send a malicious script to an unsuspecting user. The end user’s browser has no way to know that the script should not be trusted, and will execute the script. Because it thinks the script came from a trusted source, the malicious script can access any cookies, session tokens, or other sensitive information retained by the browser and used with that site. These scripts can even rewrite the content of the HTML page. For more details on the different types of XSS flaws, see: Types of Cross-Site Scripting.
    
    Related Security Activities
    How to Avoid Cross-site scripting Vulnerabilities
    See the XSS (Cross Site Scripting) Prevention Cheat Sheet
    
    See the DOM based XSS Prevention Cheat Sheet
    
    See the OWASP Development Guide article on Phishing.
    
    See the OWASP Development Guide article on Data Validation.
    
    How to Review Code for Cross-site scripting Vulnerabilities
    See the OWASP Code Review Guide article on Reviewing Code for Cross-site scripting Vulnerabilities.
    
    How to Test for Cross-site scripting Vulnerabilities
    See the latest OWASP Testing Guide article on how to test for the various kinds of XSS vulnerabilities.
    
    Testing_for_Reflected_Cross_site_scripting
    Testing_for_Stored_Cross_site_scripting
    Testing_for_DOM-based_Cross_site_scripting
    Description
    Cross-Site Scripting (XSS) attacks occur when:
    
    Data enters a Web application through an untrusted source, most frequently a web request.
    The data is included in dynamic content that is sent to a web user without being validated for malicious content.
    The malicious content sent to the web browser often takes the form of a segment of JavaScript, but may also include HTML, Flash, or any other type of code that the browser may execute. The variety of attacks based on XSS is almost limitless, but they commonly include transmitting private data, like cookies or other session information, to the attacker, redirecting the victim to web content controlled by the attacker, or performing other malicious operations on the user’s machine under the guise of the vulnerable site.
    
    Stored and Reflected XSS Attacks
    XSS attacks can generally be categorized into two categories: stored and reflected. There is a third, much less well-known type of XSS attack called DOM Based XSS that is discussed separately here.
    
    Stored XSS Attacks
    Stored attacks are those where the injected script is permanently stored on the target servers, such as in a database, in a message forum, visitor log, comment field, etc. The victim then retrieves the malicious script from the server when it requests the stored information. Stored XSS is also sometimes referred to as Persistent or Type-I XSS.
    
    Reflected XSS Attacks
    Reflected attacks are those where the injected script is reflected off the web server, such as in an error message, search result, or any other response that includes some or all of the input sent to the server as part of the request. Reflected attacks are delivered to victims via another route, such as in an e-mail message, or on some other website. When a user is tricked into clicking on a malicious link, submitting a specially crafted form, or even just browsing to a malicious site, the injected code travels to the vulnerable web site, which reflects the attack back to the user’s browser. The browser then executes the code because it came from a “trusted” server. Reflected XSS is also sometimes referred to as Non-Persistent or Type-II XSS.
    
    Other Types of XSS Vulnerabilities
    In addition to Stored and Reflected XSS, another type of XSS, DOM Based XSS was identified by Amit Klein in 2005. OWASP recommends the XSS categorization as described in the OWASP Article: Types of Cross-Site Scripting, which covers all these XSS terms, organizing them into a matrix of Stored vs. Reflected XSS and Server vs. Client XSS, where DOM Based XSS is a subset of Client XSS.
    
    XSS Attack Consequences
    The consequence of an XSS attack is the same regardless of whether it is stored or reflected (or DOM Based). The difference is in how the payload arrives at the server. Do not be fooled into thinking that a “read-only” or “brochureware” site is not vulnerable to serious reflected XSS attacks. XSS can cause a variety of problems for the end user that range in severity from an annoyance to complete account compromise. The most severe XSS attacks involve disclosure of the user’s session cookie, allowing an attacker to hijack the user’s session and take over the account. Other damaging attacks include the disclosure of end user files, installation of Trojan horse programs, redirect the user to some other page or site, or modify presentation of content. An XSS vulnerability allowing an attacker to modify a press release or news item could affect a company’s stock price or lessen consumer confidence. An XSS vulnerability on a pharmaceutical site could allow an attacker to modify dosage information resulting in an overdose. For more information on these types of attacks see Content_Spoofing.
    
    How to Determine If You Are Vulnerable
    XSS flaws can be difficult to identify and remove from a web application. The best way to find flaws is to perform a security review of the code and search for all places where input from an HTTP request could possibly make its way into the HTML output. Note that a variety of different HTML tags can be used to transmit a malicious JavaScript. Nessus, Nikto, and some other available tools can help scan a website for these flaws, but can only scratch the surface. If one part of a website is vulnerable, there is a high likelihood that there are other problems as well.
    
    How to Protect Yourself
    The primary defenses against XSS are described in the OWASP XSS Prevention Cheat Sheet.
    
    Also, it’s crucial that you turn off HTTP TRACE support on all web servers. An attacker can steal cookie data via Javascript even when document.cookie is disabled or not supported by the client. This attack is mounted when a user posts a malicious script to a forum so when another user clicks the link, an asynchronous HTTP Trace call is triggered which collects the user’s cookie information from the server, and then sends it over to another malicious server that collects the cookie information so the attacker can mount a session hijack attack. This is easily mitigated by removing support for HTTP TRACE on all web servers.
    
    The OWASP ESAPI project has produced a set of reusable security components in several languages, including validation and escaping routines to prevent parameter tampering and the injection of XSS attacks. In addition, the OWASP WebGoat Project training application has lessons on Cross-Site Scripting and data encoding.`,
    avatar: './src/assets/userAvatar/15820256995611.jpg',
    nick_name: 'an',
    userLike: true,
    collection_num: 56,
  },
  {
    id: 2,
    title: 'bbb',
    content: 'contentB',
    avatar: './src/assets/userAvatar/15820256995611.jpg',
    nick_name: 'bn',
    userLike: true,
    collection_num: 6,
  },
  {
    id: 3,
    title: 'ccc',
    content: 'contentC',
    avatar: './src/assets/userAvatar/15820256995611.jpg',
    nick_name: 'cn',
    userLike: true,
    collection_num: 5,
  },
  {
    id: 4,
    title: 'ddd',
    content: 'contentD',
    avatar: './src/assets/userAvatar/15820256995611.jpg',
    nick_name: 'dn',
    userLike: true,
    collection_num: 45,
  },
]

//
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  devServer: {
    host: 'localhost',
    port: '8088',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api',
        },
      },
    },

    // before(app) {
    //   app.post('/api/user/regist', (req, res) => {
    //     console.log(req.body)
    //     res.json({
    //       errno: 0,
    //       data: registData,
    //     })
    //   })
    //   app.post('/api/user/login', (req, res) => {
    //     console.log(req.body)
    //     res.json({
    //       errno: 0,
    //       data: registData,
    //     })
    //   })
    //   app.get('/api/blog/list', (req, res) => {
    //     res.json({
    //       errno: 0,
    //       data: searchData,
    //     })
    //   })
    //   app.get('/api/blog/detail', (req, res) => {
    //     console.log('req', req.query.id)
    //     res.json({
    //       errno: 0,
    //       data: searchData[req.query.id - 1], // 为了测试
    //     })
    //   })
    //   app.post('/api/blog/new', (req, res) => {
    //     console.log(req.body)
    //     res.json({
    //       errno: 0,
    //       data: req.body,
    //     })
    //   })
    // },
  },
  chainWebpack(config) {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('components', resolve('src/components'))
      .set('assets', resolve('src/assets'))
      .set('api', resolve('src/api'))
      .set('base', resolve('src/base'))
      .set('theme', resolve('src/theme'))
  },
  publicPath: '',
  // 8.14加
  outputDir: 'dist',
}
