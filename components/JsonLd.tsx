import React from 'react';
import type { JsonLdObject } from '@/lib/schema';

interface JsonLdProps {
  /**
   * A single JSON-LD object or an array of objects. Each object is emitted as its own
   * <script type="application/ld+json"> tag so browsers & crawlers parse them independently.
   */
  data: JsonLdObject | JsonLdObject[];
}

/** Safely serialize a JSON-LD object, escaping "</script>" sequences to keep valid HTML. */
function serialize(data: JsonLdObject): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/**
 * Reusable component that injects structured data (JSON-LD) into the page.
 * Use in Server Components / RSC pages and layouts.
 */
export default function JsonLd({ data }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <React.Fragment>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serialize(item) }}
        />
      ))}
    </React.Fragment>
  );
}