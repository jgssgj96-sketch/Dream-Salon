                <div>
                  <label className="block text-xs font-semibold text-muted uppercase mb-1">Avatar Image</label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={barbAvatar}
                        onChange={(e) => {
                          setBarbAvatar(e.target.value);
                          if (e.target.value) {
                            setBarbAvatarPreview(e.target.value);
                          } else {
                            setBarbAvatarPreview(null);
                          }
                        }}
                        placeholder="Image URL"
                        className="flex-1 px-4 py-2.5 rounded-lg bg-surface-2 border border-white/10 text-off-white text-sm"
                      />
                      <button
                        onClick={() => {
                          alert('Image upload functionality would be implemented here');
                        }}
                        className="px-3 py-2 rounded-lg bg-gold text-surface text-xs font-bold hover:bg-brass transition-colors flex items-center gap-1"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload</span>
                      </button>
                    </div>
                    {barbAvatarPreview && (
                      <div className="flex items-center gap-2">
                        <img
                          src={barbAvatarPreview}
                          alt="Preview"
                          className="w-16 h-16 rounded-full object-cover border border-gold/30"
                        />
                        <button
                          onClick={() => setBarbAvatarPreview(null)}
                          className="px-2 py-1 rounded-lg bg-surface text-muted text-xs hover:text-red-400"
                        >
                          Clear Preview
                        </button>
                      </div>
                    )}
                    {avatarUploadError && (
                      <div className="text-xs text-red-400">
                        {avatarUploadError}
                      </div>
                    )}
                  </div>
                </div>