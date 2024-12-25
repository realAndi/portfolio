import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CopyIcon, CheckIcon } from "@radix-ui/react-icons";

interface CodeBlockProps {
  code: string;
  className?: string;
  language?: string;
}

interface Token {
  type: string;
  value: string;
}

export function CodeBlock({ code, className, language = 'typescript' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tokenize = (line: string): Token[] => {
    const tokens: Token[] = [];
    let remaining = line;

    while (remaining) {
      // Comments (first priority - both JSX and regular)
      const commentMatch = remaining.match(/^(\/\/.*$|\{\/\*.*?\*\/\})/);
      if (commentMatch) {
        tokens.push({ type: 'comment', value: commentMatch[1] });
        remaining = remaining.slice(commentMatch[1].length);
        continue;
      }

      // Strings (second priority)
      const stringMatch = remaining.match(/^(['"`])((?:\\.|[^\\])*?)\1/);
      if (stringMatch) {
        tokens.push({ type: 'string', value: stringMatch[0] });
        remaining = remaining.slice(stringMatch[0].length);
        continue;
      }

      // Keywords and types (with strict word boundaries)
      const keywordMatch = remaining.match(/^(?!\w*\()(\b(?:const|let|var|function|return|if|else|async|await|new|import|export|default)\b)/);
      if (keywordMatch) {
        tokens.push({ type: 'keyword', value: keywordMatch[1] });
        remaining = remaining.slice(keywordMatch[1].length);
        continue;
      }

      // Built-in types
      const typeMatch = remaining.match(/^(?!\w*\()(\b(?:Array|Object|Boolean|String|Number|null|undefined|true|false)\b)/);
      if (typeMatch) {
        tokens.push({ type: 'type', value: typeMatch[1] });
        remaining = remaining.slice(typeMatch[1].length);
        continue;
      }

      // Function names
      const functionMatch = remaining.match(/^(\w+)(?=\s*\()/);
      if (functionMatch) {
        tokens.push({ type: 'function', value: functionMatch[1] });
        remaining = remaining.slice(functionMatch[1].length);
        continue;
      }

      // Numbers
      const numberMatch = remaining.match(/^(\d+(?:\.\d+)?)\b/);
      if (numberMatch) {
        tokens.push({ type: 'number', value: numberMatch[1] });
        remaining = remaining.slice(numberMatch[1].length);
        continue;
      }

      // Punctuation
      const punctuationMatch = remaining.match(/^([{}[\]().,><=!+\-*/%])/);
      if (punctuationMatch) {
        tokens.push({ type: 'punctuation', value: punctuationMatch[1] });
        remaining = remaining.slice(punctuationMatch[1].length);
        continue;
      }

      // Other (whitespace and unmatched characters)
      const otherMatch = remaining.match(/^(\s+|\S)/);
      if (otherMatch) {
        tokens.push({ type: 'text', value: otherMatch[1] });
        remaining = remaining.slice(otherMatch[1].length);
        continue;
      }
    }

    return tokens;
  };

  const getTokenClassName = (type: string): string => {
    switch (type) {
      case 'keyword':
        return 'text-pink-500 dark:text-pink-400';
      case 'type':
        return 'text-yellow-600 dark:text-yellow-300';
      case 'function':
        return 'text-blue-600 dark:text-blue-400';
      case 'string':
        return 'text-green-600 dark:text-green-400';
      case 'number':
        return 'text-purple-600 dark:text-purple-400';
      case 'comment':
        return 'text-slate-500 dark:text-slate-400 italic';
      case 'punctuation':
        return 'text-slate-600 dark:text-slate-400';
      default:
        return '';
    }
  };

  return (
    <pre className={`font-mono text-sm bg-slate-50 dark:bg-zinc-900 rounded-lg w-full ${className}`}>
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-700 bg-inherit">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
            {language}
          </span>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 hover:bg-slate-100 dark:hover:bg-slate-800"
          onClick={copyToClipboard}
        >
          {copied ? (
            <CheckIcon className="h-4 w-4 text-green-500" />
          ) : (
            <CopyIcon className="h-4 w-4 text-slate-500" />
          )}
        </Button>
      </div>

      <div className="overflow-auto">
        <code className="block p-4 min-w-full">
          {code.split('\n').map((line, i) => (
            <div key={i} className="whitespace-pre">
              {tokenize(line).map((token, j) => (
                <span 
                  key={`${i}-${j}`} 
                  className={getTokenClassName(token.type)}
                >
                  {token.value}
                </span>
              ))}
            </div>
          ))}
        </code>
      </div>
    </pre>
  );
} 