import ExampleTheme from "../themes/ExampleTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import TreeViewPlugin from "../plugins/TreeViewPlugin";
import ToolbarPlugin from "../plugins/ToolbarPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

import ListMaxIndentLevelPlugin from "../plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "../plugins/CodeHighlightPlugin";
import ColloquialAutoLinkPlugin from "../plugins/AutoLinkPlugin";

function Placeholder() {
    return <div className="">Enter some rich text...</div>;
}

const editorConfig = {
    // The editor theme
    theme: ExampleTheme,
    // Handling of errors during update
    onError(error) {
        throw error;
    },
    // Any custom nodes go here
    nodes: [
        HeadingNode,
        ListNode,
        ListItemNode,
        QuoteNode,
        CodeNode,
        CodeHighlightNode,
        TableNode,
        TableCellNode,
        TableRowNode,
        AutoLinkNode,
        LinkNode
    ]
};

export default function Editor() {
    return (
        <LexicalComposer initialConfig={editorConfig}>
            <div className="bg-chateau w-4/5 h-4/5 flex-row justify-evenly">
                <ToolbarPlugin />
                <div className="flex-row">
                    <div className="bg-slate">
                        <RichTextPlugin
                        contentEditable={<ContentEditable className="h-11/12" />}
                        placeholder={<Placeholder />}
                        ErrorBoundary={LexicalErrorBoundary}
                        />
                    </div>
                    <div className="h-2/5">
                        <HistoryPlugin />
                        <TreeViewPlugin />
                        <AutoFocusPlugin />
                        <CodeHighlightPlugin />
                        <ListPlugin />
                        <LinkPlugin />
                        <ColloquialAutoLinkPlugin />
                        <ListMaxIndentLevelPlugin maxDepth={7} />
                        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
                    </div>
                </div>
            </div>
        </LexicalComposer>
    );
}
