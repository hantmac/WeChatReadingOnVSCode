import { ExtensionContext, ViewColumn, WebviewPanel, window, commands } from 'vscode';

let webviewPanel : WebviewPanel | undefined;

export function createWebView(
    context: ExtensionContext,
    viewColumn: ViewColumn,
    label: string
) {
    if(webviewPanel === undefined) {
        webviewPanel = window.createWebviewPanel(
            'webView',
            label,
            viewColumn,
            {
                retainContextWhenHidden: true,
                enableScripts: true
            }
        );
        webviewPanel.webview.html = getIframeHtml(label);
    } else {
        webviewPanel.title = label;
        webviewPanel.webview.postMessage({label: label});
        webviewPanel.reveal();
    }

    webviewPanel.onDidDispose(() => {
        webviewPanel = undefined;
    });

    webviewPanel.webview.onDidReceiveMessage(message => {
        switch(message.command) {
            case 'ifarmeLabel': 
                window.showInformationMessage(message.text);
        }
    });
    
    return webviewPanel;
}

export function getIframeHtml(label: string) {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
            *{
                width: 100%;
                height: 100%;
            }
            html,
            body {
                margin: 0 !important;
                padding: 0 !important;
                background: #333;
            }
            .iframeDiv {
                background: #333;
                width: 100%;
                height: 100%;
            }
            #iframe1{

            }
        </style>
        <script>
           
        </script>
        </head>
        <body>
            <iframe id='iframe1' frameborder="0" class="iframeDiv" src="https://weread.qq.com/" scrolling="auto"></iframe>
        </body>
    </html>
    `;
}