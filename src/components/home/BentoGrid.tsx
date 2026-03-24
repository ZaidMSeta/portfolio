import { useState } from "react";
import {
  MapPin,
  GitCommit,
  MessageSquare,
  MousePointerClick,
  Link2,
} from "lucide-react";

function GitHubActivity() {
  return (
    <div className="card col-span-2 row-span-2">
      <div className="flex items-center gap-2 mb-4">
        <GitCommit size={14} />
        <h3 className="text-sm font-medium">Recent Activity</h3>
      </div>

      <div className="space-y-3 text-sm text-muted-foreground">
        <p>Fix websocket reconnect</p>
        <p>Add UDP visualization</p>
        <p>Refactor sync logic</p>
      </div>
    </div>
  );
}

function ClickMeTile() {
  const [count, setCount] = useState(0);

  return (
    <button
      onClick={() => setCount((c) => c + 1)}
      className="card text-left"
    >
      <MousePointerClick size={14} className="mb-3" />
      <p className="text-2xl font-semibold">{count}</p>
      <p className="text-sm text-muted-foreground">clicks</p>
    </button>
  );
}

function LocationTile() {
  return (
    <div className="card">
      <MapPin size={14} className="mb-3" />
      <p className="font-medium">Hamilton, ON</p>
      <p className="text-sm text-muted-foreground">Canada</p>
    </div>
  );
}

function GuestbookPreview() {
  return (
    <div className="card col-span-2">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare size={14} />
        <h3 className="text-sm font-medium">Guestbook</h3>
      </div>

      <div className="space-y-2 text-sm text-muted-foreground">
        <p>“Clean portfolio!”</p>
        <p>“Nice projects”</p>
      </div>
    </div>
  );
}

function WebringTile() {
  return (
    <div className="card">
      <Link2 size={14} className="mb-3" />
      <p className="font-medium">McMaster</p>
      <p className="text-sm text-muted-foreground">Webring</p>
    </div>
  );
}

export function BentoGrid() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-6">Extras</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GitHubActivity />
        <ClickMeTile />
        <LocationTile />
        <GuestbookPreview />
        <WebringTile />
      </div>
    </section>
  );
}