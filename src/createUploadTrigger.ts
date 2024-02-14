const createUploadTrigger = (onUpload?: (file: File) => void, onFail?: () => void) => {
  const onChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0] ?? null;
    if (file != null) {
      onUpload?.(file);
    } else {
      onFail?.();
    }
    target.removeEventListener('change', onChange);
    target.remove();
  };

  return () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.addEventListener('change', onChange);
    input.click();
  };
};

export default createUploadTrigger;
