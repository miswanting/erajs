import webbrowser


class BrowserManager:
    def open_new_tab(self, url='http://localhost/'):
        webbrowser.open_new_tab(url)
