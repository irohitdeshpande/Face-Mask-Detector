# Hugging Face Spaces Dockerfile for Face Mask Detector Backend
# Lighter base image with Python 3.11
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    TF_CPP_MIN_LOG_LEVEL=2

# Install system dependencies required by opencv & others
RUN apt-get update && apt-get install -y --no-install-recommends \
    libglib2.0-0 libsm6 libxrender1 libxext6 libgl1 wget ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy only requirements first for better layer caching
COPY facemask_detection/requirements.txt ./requirements.txt

# Install Python deps
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy application code (only backend directory contents)
COPY facemask_detection/ .

# Default port provided by Hugging Face is in $PORT (fallback 7860)
ENV PORT=7860
EXPOSE 7860

# Healthcheck (container-level) optional
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
 CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:${PORT}/health || exit 1

# Start gunicorn
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:${PORT}", "--timeout", "180"]
