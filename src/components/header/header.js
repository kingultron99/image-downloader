export default function Header() {
    return (
      <header className="w-screen top-0 left-0">
        <div className="z-50 fixed select-none flex w-screen top-0 left-0 text-sm bg-gray-800 drag-region pl-2 text-white">
          <p className="self-center">Image Downloader!</p>
          <div className="window-controls">
            <div className="window-control" onClick={window.controls.minimise}>_</div>
            <div className="window-control" onClick={window.controls.maximise}>▢</div>
            <div className="window-control hover:bg-red-600" onClick={window.controls.close}>X</div>
          </div>
        </div>
      </header>
    );
}