import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TreeView } from "@lexical/react/LexicalTreeView";

function TreeViewPlugin() {
    const [editor] = useLexicalComposerContext();
    return (
        <TreeView
            viewClassName="bg-swirl text-slate"
            timeTravelPanelClassName="debug-timetravel-panel"
            timeTravelButtonClassName="debug-timetravel-button"
            timeTravelPanelSliderClassName="debug-timetravel-panel-slider"
            timeTravelPanelButtonClassName="debug-timetravel-panel-button"
            editor={editor}
        />
    );
}

export default TreeViewPlugin
