// Data source: https://open.toronto.ca/dataset/street-tree-data/
import trees from './trees.json';
import lessTrees from './less-trees.json';

export type Tree = {
  key: string;
  name: string;
  category: string;
  position: google.maps.LatLngLiteral;
};

export type CategoryData = {
  key: string;
  label: string;
  count: number;
};

for (let i = 0; i < trees.length; i++) {
  (trees[i] as Tree).key = `tree-${i}`;
}



/**
 * Simulates async loading of the dataset from an external source.
 * (data is inlined for simplicity in our build process)
 */
export async function loadTreeDataset(): Promise<Tree[]> {
  // simulate loading the trees from an external source
  return new Promise(resolve => {
    setTimeout(() => resolve(trees as Tree[]), 2000);
  });
}


export async function loadLessTreeDataset(): Promise<Tree[]> {
  // simulate loading the trees from an external source

  for (let i = 0; i < lessTrees.length; i++) {
    if (lessTrees[i]) {
      (lessTrees[i] as Tree).key = `tree-${i}`;
    } else {
      console.warn(`Element at index ${i} is undefined.`);
    }
  }


  return new Promise(resolve => {
    setTimeout(() => resolve(lessTrees as Tree[]), 2000);
  });
}

export function getCategories(trees?: Tree[]): CategoryData[] {
  if (!trees) return [];

  const countByCategory: {[c: string]: number} = {};
  for (const t of trees) {
    if (!countByCategory[t.category]) countByCategory[t.category] = 0;
    countByCategory[t.category]++;
  }

  return Object.entries(countByCategory).map(([key, value]) => {
    const label = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    return {
      key: key,
      label,
      count: value
    };
  });
}

export default trees as Tree[];
