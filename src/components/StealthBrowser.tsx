import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, Globe, Shield, ShieldOff, Home, BookOpen } from "lucide-react";

const StealthBrowser = () => {
  const [stealthMode, setStealthMode] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("https://www.google.com");
  const [displayUrl, setDisplayUrl] = useState("");

  useEffect(() => {
    if (stealthMode) {
      // Change the actual URL to about:blank when stealth mode is on
      window.history.replaceState({}, "", "about:blank");
      setDisplayUrl("about:blank");
    } else {
      // Restore normal URL display
      window.history.replaceState({}, "", "/");
      setDisplayUrl(currentUrl);
    }
  }, [stealthMode, currentUrl]);

  const quickSites = [
    { name: "Google", url: "https://www.google.com", icon: Search },
    { name: "Wikipedia", url: "https://www.wikipedia.org", icon: BookOpen },
    { name: "News", url: "https://news.google.com", icon: Globe },
  ];

  const handleSiteChange = (url: string) => {
    setCurrentUrl(url);
    if (!stealthMode) {
      setDisplayUrl(url);
    }
  };

  return (
    <div className="min-h-screen bg-stealth-bg text-stealth-text">
      {/* Header */}
      <div className="bg-stealth-surface border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Globe className="w-6 h-6 text-stealth-accent" />
              <span className="font-semibold text-lg">StealthBrowse</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {stealthMode ? (
                <Shield className="w-4 h-4 text-stealth-accent" />
              ) : (
                <ShieldOff className="w-4 h-4 text-stealth-text-muted" />
              )}
              <span className="text-sm">Stealth Mode</span>
              <Switch
                checked={stealthMode}
                onCheckedChange={setStealthMode}
                className="data-[state=checked]:bg-stealth-accent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* URL Bar */}
      <div className="bg-stealth-surface border-b border-border p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <Input
              value={stealthMode ? "about:blank" : currentUrl}
              onChange={(e) => !stealthMode && setCurrentUrl(e.target.value)}
              className="flex-1 bg-stealth-bg border-border text-stealth-text"
              placeholder="Enter URL..."
              readOnly={stealthMode}
            />
            <Button
              onClick={() => handleSiteChange(currentUrl)}
              variant="secondary"
              size="sm"
              className="px-4"
            >
              Go
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="bg-stealth-surface border-b border-border p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-stealth-text-muted">Quick Access:</span>
            {quickSites.map((site) => {
              const Icon = site.icon;
              return (
                <Button
                  key={site.name}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSiteChange(site.url)}
                  className="flex items-center space-x-2 hover:bg-stealth-accent/10"
                >
                  <Icon className="w-4 h-4" />
                  <span>{site.name}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Browser Content */}
      <div className="flex-1 p-4">
        <div className="max-w-7xl mx-auto">
          <Card className="h-[calc(100vh-200px)] bg-stealth-surface border-border overflow-hidden">
            {stealthMode ? (
              <div className="h-full flex items-center justify-center bg-white">
                <div className="text-center text-gray-800">
                  <div className="text-6xl mb-4">🔒</div>
                  <h2 className="text-2xl font-bold mb-2">Stealth Mode Active</h2>
                  <p className="text-gray-600">Content hidden - URL shows about:blank</p>
                  <p className="text-sm text-gray-500 mt-4">
                    Turn off stealth mode to access websites
                  </p>
                </div>
              </div>
            ) : (
              <iframe
                src={currentUrl}
                className="w-full h-full border-0"
                title="Browser Content"
                sandbox="allow-scripts allow-same-origin allow-forms allow-navigation"
              />
            )}
          </Card>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-stealth-surface border-t border-border p-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-stealth-text-muted">
          <div className="flex items-center space-x-4">
            <span>Status: {stealthMode ? "Hidden" : "Visible"}</span>
            <span>URL: {stealthMode ? "about:blank" : currentUrl}</span>
          </div>
          <div>
            Press Alt+S to toggle stealth mode
          </div>
        </div>
      </div>
    </div>
  );
};

export default StealthBrowser;